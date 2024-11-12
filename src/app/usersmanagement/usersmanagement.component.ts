import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateComponent } from '../update/update.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'; // Importer le composant de confirmation
import { User } from '../user.model';

@Component({
  selector: 'app-usersmanagement',
  templateUrl: './usersmanagement.component.html',
  styleUrls: ['./usersmanagement.component.css'],
})
export class UsersmanagementComponent implements OnInit {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  displayedColumns: string[] = ['name', 'actions', 'status', 'update'];
  users: User[] = [];
  filterValue: string = '';

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    this.tableData();
  }

  handleUpdateAction(user: User): void {
    if (user.id === undefined) {
      console.error('User ID is undefined. Cannot update.');
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { user };

    const dialogRef = this.dialog.open(UpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((updatedData: User) => {
      if (updatedData) {
        this.userService
          .updateUser(user.id as number, updatedData)
          .subscribe((updatedUser) => {
            const index = this.users.findIndex((u) => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
              this.dataSource.data = [...this.users];
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
        user.status = newStatus;
        this.dataSource.data = [...this.users];
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
      },
    });
  }

  deleteUser(id: number): void {
    // Ouvrir la boîte de dialogue de confirmation
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '350px',
      disableClose: true,
    });

    // Traitement après la fermeture de la boîte de dialogue
    dialogRef.afterClosed().subscribe((confirm: boolean) => {
      if (confirm) {
        this.userService.deleteUserById(id).subscribe(
          () => {
            this.users = this.users.filter((user) => user.id !== id);
            this.dataSource.data = [...this.users];
            console.log('Utilisateur supprimé avec succès.');
          },
          (error) => {
            console.error(
              "Erreur lors de la suppression de l'utilisateur",
              error
            );
          }
        );
      }
    });
  }

  tableData(): void {
    this.userService.getAllUsers().subscribe((response: User[]) => {
      this.users = response;
      this.dataSource.data = this.users;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
