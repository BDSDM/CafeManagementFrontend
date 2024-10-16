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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
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
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home/dashboard']);
      },
      (error) => {
        console.error('Login  error:', error);
      }
    );
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible; // Inverser l'état de visibilité
  }
}
