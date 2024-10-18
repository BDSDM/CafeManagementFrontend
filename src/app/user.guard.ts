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
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifiez si l'utilisateur est authentifié
    if (this.authService.isAuthenticated()) {
      return true; // Autorise l'accès
    }

    // Redirige vers la page de connexion si non authentifié
    this.router.navigate(['/login']);
    return false; // Refuse l'accès
  }
}
