// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Méthode pour récupérer le token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null;
  }

  // Méthode pour récupérer le rôle depuis le token
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.role; // Assure-toi que 'role' est dans le payload
    }
    return null;
  }
  getUserId(): number {
    const token = this.getToken();
    if (!token) {
      return -1; // Si le token est absent, retourner null
    }

    try {
      // Décoder la partie payload
      const payload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));

      // Vérifier que l'ID existe dans le payload
      return decodedPayload?.id || null;
    } catch (error) {
      console.error('Erreur lors du décodage du token:', error);
      return -1; // En cas d'erreur, retourner null
    }
  }
}
