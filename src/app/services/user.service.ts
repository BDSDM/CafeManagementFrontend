import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8081/user/signUp';
  private urlLogin = 'http://localhost:8081/user/login';
  private apiUrl = 'http://localhost:8081/api';

  constructor(private httpClient: HttpClient, private router: Router) {}

  signup(data: any) {
    return this.httpClient.post(this.url, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'), // Correction ici
    });
  }
  login(data: any) {
    return this.httpClient.post(this.urlLogin, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'), // Correction ici
    });
  }
  getStoredUserName(): string {
    return localStorage.getItem('name') || '';
  }
  checkActivity() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const jwt = JSON.parse(atob(token.split('.')[1]));
        const expires = new Date(jwt.exp * 1000);
        const timeout = expires.getTime() - Date.now();
        if (timeout <= 0) {
          this.logout();
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        console.error('Erreur lors du traitement du token JWT :', e.message);
      } else {
        console.error('Erreur inconnue lors du traitement du token JWT :', e);
      }
      this.logout();
    }
  }

  logout() {
    //localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/home']);
  }
  setColorPreference(color: string): Observable<any> {
    // Vérification de la valeur de couleur
    if (!color || color.trim() === '') {
      throw new Error('La couleur ne peut pas être vide');
    }

    // Récupérer le token JWT depuis le localStorage
    const token = localStorage.getItem('token'); // Ou utilisez une autre méthode pour obtenir le token
    console.log('Token:', token);
    console.log('Color:', color);

    // Créer un paramètre de requête pour la couleur
    const params = new HttpParams().set('color', color);

    // Ajouter le token JWT dans l'en-tête Authorization
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Envoyer la requête POST avec le token et les cookies
    return this.httpClient.post(`${this.apiUrl}/set-color`, null, {
      params,
      headers, // Inclure l'en-tête avec le token
      responseType: 'text', // Spécifier le type de réponse attendu
      withCredentials: true, // Inclure les cookies dans la requête
    });
  }
  getColorPreference(): Observable<string> {
    // Récupérer le token JWT depuis le localStorage
    const token = localStorage.getItem('token'); // Ou utilisez une autre méthode pour obtenir le token

    // Ajouter le token JWT dans l'en-tête Authorization
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Envoyer la requête GET avec le token et les cookies
    return this.httpClient.get(`${this.apiUrl}/get-color`, {
      headers, // Inclure l'en-tête avec le token
      responseType: 'text', // Spécifier le type de réponse attendu
      withCredentials: true, // Inclure les cookies dans la requête
    });
  }
}
