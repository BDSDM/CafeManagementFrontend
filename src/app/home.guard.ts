import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      // Empêcher la boucle en ne redirigeant pas si l'utilisateur est déjà sur /dashboard
      if (state.url === '/home/dashboard') {
        return true; // Autoriser l'accès au dashboard
      }

      // Rediriger les utilisateurs authentifiés vers le dashboard
      this.router.navigate(['/home/dashboard']);
      return false; // Bloquer l'accès à la page actuelle
    }

    return true; // Autoriser l'accès si non authentifié (ex: accès à la page de login)
  }
}
