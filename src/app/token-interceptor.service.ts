import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let modifiedReq = req;

    // Ajouter le token à l'en-tête Authorization si disponible
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Passer la requête au handler suivant
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error occurred:', error);

        if (error.status === 401 || error.status === 403) {
          // Si non autorisé (token invalide ou expiré)
          localStorage.removeItem('token');
          this.router.navigate(['/home']);
        }

        const errorMessage = error.error?.message || error.message;
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
