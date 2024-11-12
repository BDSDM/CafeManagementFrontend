import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  password = true;
  passwordVisible: boolean = false;
  loginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  handleSubmit() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password,
    };
    this.userService.login(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        console.log('réponse' + response);
        console.log('Réponse:', JSON.stringify(response, null, 2));

        console.log('Token' + response.token);
        console.log('Rôle' + response.role);

        const token = response.token; // Récupère le token
        const payload = token.split('.')[1]; // Prend la seconde partie du token
        const decodedPayload = JSON.parse(atob(payload)); // Décode la partie payload

        console.log('Payload décodé:', decodedPayload); // Affiche le payload
        console.log('Rôle:', decodedPayload.role); // Vérifie si le rôle est présent
        const userName = decodedPayload.name;
        console.log("Nom de l'utilisateur:", userName);

        // Stocker le nom dans le localStorage ou via un service
        localStorage.setItem('name', userName); // Stocker le nom de l'utilisateur

        localStorage.setItem('token', response.token);
        this.router.navigate(['/home/dashboard']);
      },
      (error) => {
        this.loginError = true;
        console.error('Login  error:', error);
      }
    );
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Inverser l'état de visibilité
  }
}
