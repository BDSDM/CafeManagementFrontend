import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8081/user/signUp';

  constructor(private httpClient: HttpClient) {}

  signup(data: any) {
    return this.httpClient.post(this.url, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'), // Correction ici
    });
  }
}