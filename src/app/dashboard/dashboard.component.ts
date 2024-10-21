import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  currentColor: string = 'white'; // Valeur par défaut initiale
  username: string = '';
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.username = this.userService.getStoredUserName();
    this.loadColorPreference();
  }
  Logout() {
    this.userService.logout();
  }
  setColor(color: string): void {
    this.userService.setColorPreference(color).subscribe({
      next: () => {
        this.currentColor = color;
        console.log('Couleur définie avec succès : ' + color);
      },
      error: (error) => {
        console.error('Erreur lors de la définition de la couleur :', error);
      },
    });
  }

  loadColorPreference(): void {
    this.userService.getColorPreference().subscribe({
      next: (color) => {
        console.log('Couleur récupérée du backend :', color);
        this.currentColor = color || 'white'; // Appliquer la couleur récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la couleur :', error);
        this.currentColor = 'white'; // Définir la couleur par défaut en cas d'erreur
      },
    });
  }
}
