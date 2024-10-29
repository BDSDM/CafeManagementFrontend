import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  currentColor: string = 'white'; // Valeur par défaut initiale
  username: string = '';
  accessAuthorization: boolean = false;
  showPopup: boolean = false;
  role: string = ''; // Propriété de la classe

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupération du rôle et assignation à la propriété de la classe
    this.role = this.authService.getRole() || '';

    // Utilisation d'une chaîne vide comme valeur par défaut si username est null
    this.username = this.userService.getStoredUserName() || '';

    this.loadColorPreference();

    // Souscription pour obtenir la valeur de accessAuthorization
    this.userService.accessAuthorization$.subscribe((value: boolean) => {
      this.accessAuthorization = value;
    });
  }

  openPopup(event: Event) {
    console.log('accessAuthorization ' + this.accessAuthorization);
    console.log('role ' + this.role);
    this.accessAuthorization = true;
    if (this.accessAuthorization && this.role !== 'admin') {
      event.preventDefault(); // Empêche la navigation automatique
      this.showPopup = true; // Afficher la popup si accessAuthorization est true

      // Après avoir montré la popup, tu peux naviguer manuellement si nécessaire
      this.router.navigate(['/home/dashboard/usersmanagement']);
    } else {
      this.showPopup = false; // Masquer la popup si non autorisé
    }
  }

  closePopup() {
    this.showPopup = false; // Fermer la popup
  }

  Logout() {
    this.accessAuthorization = false;

    this.userService.setAccessAuthorization(this.accessAuthorization);
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
