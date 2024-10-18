import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersmanagementComponent } from './usersmanagement.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersmanagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UsersmanagementComponent }, // Assurez-vous que la route par défaut charge le bon composant
    ]),
  ],
})
export class UsersManagementModule {}
