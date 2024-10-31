import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  accessAuthorization: boolean = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  handleSignupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    this.dialog.open(SignupComponent, dialogConfig);
  }
  handleLoginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    this.dialog.open(LoginComponent, dialogConfig);
  }
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  Logout() {
    this.accessAuthorization = false;

    this.userService.setAccessAuthorization(this.accessAuthorization);
    this.userService.logout();
  }
}
