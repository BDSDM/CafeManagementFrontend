import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersmanagementComponent } from '../usersmanagement/usersmanagement.component';

const routes: Routes = [
  {
    path: '', // Chemin vide pour correspondre à /home/dashboard/usersmanagement
    component: UsersmanagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersManagementRoutingModule {}
