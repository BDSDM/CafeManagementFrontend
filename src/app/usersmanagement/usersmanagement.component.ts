import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-usersmanagement',
  templateUrl: './usersmanagement.component.html',
  styleUrls: ['./usersmanagement.component.css'],
})
export class UsersmanagementComponent {
  dataSource: any;
  displayedColumns: string[] = ['name', 'actions', 'status'];
  users: Array<any> = []; // Liste complète des utilisateurs
  filteredUsers: Array<any> = []; // Liste des utilisateurs filtrés
  filterValue: string = ''; // Valeur du filtre
  constructor(private dialog: MatDialog, private userService: UserService) {}
  ngOnInit(): void {
    this.tableData();
  }
  toggleStatus(user: any): void {
    const newStatus = user.status === 'true' ? 'false' : 'true';
    this.userService.updateUserStatus(user.id, newStatus).subscribe({
      next: () => {
        user.status = newStatus; // Mettre à jour le statut localement après succès
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du statut', err);
      },
    });
  }
  deleteUser(id: number): void {
    this.userService.deleteUserById(id).subscribe(
      () => {
        // Une fois supprimé, mettre à jour la liste des utilisateurs
        this.users = this.users.filter((user) => user.id !== id);
        this.tableData();

        console.log('Utilisateur supprimé avec succès.');
      },
      (error) => {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
      }
    );
  }
  tableData() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value; // Obtenir l'élément d'entrée
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Met à jour filterValue avec la valeur de l'input
  }
}
