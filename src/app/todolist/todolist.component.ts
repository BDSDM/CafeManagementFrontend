import { Component } from '@angular/core';
import { ToDoList } from '../todolist.model';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
})
export class TodolistComponent {
  tasks: ToDoList[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  newTask = { title: '', description: '' };

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadTasks();
  }
  deleteTask(taskId: number): void {
    this.userService.deleteTask(taskId).subscribe(
      () => {
        this.loadTasks(); // Recharge la liste des tâches
      },
      (error) => {
        this.errorMessage = 'Erreur lors de la suppression de la tâche.';
      }
    );
  }

  addTask() {
    const userId = this.authService.getUserId(); // Récupérer l'ID de l'utilisateur connecté
    if (userId) {
      this.userService.addTaskForUser(userId, this.newTask).subscribe({
        next: (response) => {
          console.log('Tâche ajoutée:', response);
          alert('Tâche ajoutée avec succès !');
          this.newTask = { title: '', description: '' }; // Réinitialiser le formulaire
          this.loadTasks();
        },
        error: (error) =>
          console.error("Erreur lors de l'ajout de la tâche:", error),
      });
    }
  }

  // Charger les tâches pour l'utilisateur connecté
  loadTasks(): void {
    const userId = this.authService.getUserId(); // Récupérer l'ID utilisateur
    this.isLoading = true;

    this.userService.getTasksForUser(userId).subscribe({
      next: (data) => {
        this.tasks = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des tâches.';
        this.isLoading = false;
        console.error(error);
      },
    });
  }
}
