// admin.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  accessAuthorization!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.authService.getRole();
    const isAuthenticated = this.authService.isAuthenticated();

    // Vérifie si l'utilisateur est authentifié et a le rôle 'admin'
    if (role === 'admin') {
      this.accessAuthorization = false;

      this.userService.setAccessAuthorization(this.accessAuthorization);
      return true;
    }

    // Redirige vers une autre route si l'utilisateur n'est pas autorisé
    this.accessAuthorization = true;

    this.userService.setAccessAuthorization(this.accessAuthorization);

    this.router.navigate(['/home/dashboard']);
    return false;
  }
}
