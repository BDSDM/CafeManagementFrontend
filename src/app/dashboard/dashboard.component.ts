import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { ConfirmLogoutDialogComponent } from '../confirm-logout-dialog/confirm-logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Vérifie si une URL a été précédemment sauvegardée
    const lastVisitedUrl = localStorage.getItem('lastVisitedUrl');
    console.log('lastVisitedUrl:', lastVisitedUrl); // Pour vérifier dans la console

    // Si une URL est trouvée, redirige l'utilisateur vers cette URL
    if (lastVisitedUrl) {
      this.router.navigate([lastVisitedUrl]);
    }

    // Récupère le rôle et le nom d'utilisateur
    this.role = this.authService.getRole() || '';
    this.username = this.userService.getStoredUserName() || '';
    this.loadColorPreference();

    // Souscription pour obtenir la valeur de accessAuthorization
    this.userService.accessAuthorization$.subscribe((value: boolean) => {
      this.accessAuthorization = value;
    });
  }

  openPopup(event: Event) {
    console.log('accessAuthorization:', this.accessAuthorization);
    console.log('role:', this.role);
    localStorage.setItem('lastVisitedUrl', '/home/dashboard/usersmanagement');
    console.log(
      'URL sauvegardée dans localStorage:',
      localStorage.getItem('lastVisitedUrl')
    );

    this.accessAuthorization = true;
    if (this.accessAuthorization && this.role !== 'admin') {
      // Sauvegarde l'URL avant la navigation

      event.preventDefault(); // Empêche la navigation automatique
      this.showPopup = true; // Affiche la popup si accessAuthorization est true

      // Navigue manuellement après la sauvegarde de l'URL
      this.router.navigate(['/home/dashboard/usersmanagement']);
    } else {
      this.showPopup = false; // Masque la popup si non autorisé
    }
  }

  closePopup() {
    this.showPopup = false; // Ferme la popup
  }

  Logout() {
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si l'utilisateur confirme la déconnexion
        this.accessAuthorization = false;
        this.userService.setAccessAuthorization(this.accessAuthorization);
        this.userService.logout();
        localStorage.removeItem('lastVisitedUrl'); // Efface l'URL lors de la déconnexion
      }
    });
  }

  setColor(color: string): void {
    this.userService.setColorPreference(color).subscribe({
      next: () => {
        this.currentColor = color;
        console.log('Couleur définie avec succès:', color);
      },
      error: (error) => {
        console.error('Erreur lors de la définition de la couleur:', error);
      },
    });
  }

  loadColorPreference(): void {
    this.userService.getColorPreference().subscribe({
      next: (color) => {
        console.log('Couleur récupérée du backend:', color);
        this.currentColor = color || 'white'; // Applique la couleur récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la couleur:', error);
        this.currentColor = 'white'; // Définir la couleur par défaut en cas d'erreur
      },
    });
  }
}
