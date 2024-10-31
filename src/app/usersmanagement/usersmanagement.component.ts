import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateComponent } from '../update/update.component';
import { User } from '../user.model';

@Component({
  selector: 'app-usersmanagement',
  templateUrl: './usersmanagement.component.html',
  styleUrls: ['./usersmanagement.component.css'],
})
export class UsersmanagementComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(); // Initialise dataSource
  displayedColumns: string[] = ['name', 'actions', 'status', 'update'];
  users: User[] = []; // Liste des utilisateurs pour maintenir les données
  filterValue: string = ''; // Valeur du filtre

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.tableData(); // Récupère les données au chargement du composant
  }

  handleUpdateAction(user: User): void {
    if (user.id === undefined) {
      console.error('User ID is undefined. Cannot update.');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { user }; // Envoi de l'utilisateur actuel au modal

    const dialogRef = this.dialog.open(UpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((updatedData: User) => {
      if (updatedData) {
        // Assertion de type
        this.userService
          .updateUser(user.id as number, updatedData)
          .subscribe((updatedUser) => {
            const index = this.users.findIndex((u) => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser; // Met à jour la liste locale
              this.dataSource.data = [...this.users]; // Rafraîchit dataSource
            }
          });
      }
    });
  }

  toggleStatus(user: User): void {
    if (user.id === undefined) {
      console.error('User ID is undefined. Cannot toggle status.');
      return;
    }

    const newStatus = user.status === 'true' ? 'false' : 'true';
    this.userService.updateUserStatus(user.id, newStatus).subscribe({
      next: () => {
        user.status = newStatus; // Met à jour le statut localement après succès
        this.dataSource.data = [...this.users];
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
      },
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUserById(id).subscribe(
      () => {
        this.users = this.users.filter((user) => user.id !== id); // Supprime l'utilisateur localement
        this.dataSource.data = [...this.users]; // Met à jour dataSource
        console.log('Utilisateur supprimé avec succès.');
      },
      (error) => {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
      }
    );
  }

  tableData(): void {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      this.users = response;
      this.dataSource.data = this.users; // Initialise dataSource avec les données
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Met à jour le filtre de la table
  }
}
