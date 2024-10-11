import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  handleSignupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    this.dialog.open(SignupComponent, dialogConfig);
  }
}
