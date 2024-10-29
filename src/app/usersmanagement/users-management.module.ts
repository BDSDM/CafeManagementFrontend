import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersmanagementComponent } from './usersmanagement.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule, // <-- Et ici dans les imports

    RouterModule.forChild([
      { path: '', component: UsersmanagementComponent }, // Assurez-vous que la route par défaut charge le bon composant
    ]),
  ],
})
export class UsersManagementModule {}
