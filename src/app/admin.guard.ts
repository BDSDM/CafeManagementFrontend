// admin.guard.ts
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
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.authService.getRole();
    const isAuthenticated = this.authService.isAuthenticated();

    // Vérifie si l'utilisateur est authentifié et a le rôle 'admin'
    if (isAuthenticated && role === 'admin') {
      return true;
    }

    // Redirige vers une autre route si l'utilisateur n'est pas autorisé
    this.router.navigate(['/home/dashboard']);
    return false;
  }
}
