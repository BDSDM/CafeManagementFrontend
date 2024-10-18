import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [UserGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./dashboard/dashboard.module').then(
                (m) => m.DashboardModule
              ),
          },
          {
            path: 'usersmanagement',
            loadChildren: () =>
              import('./usersmanagement/users-management.module').then(
                (m) => m.UsersManagementModule
              ),
            canActivate: [AdminGuard], // Vérifiez que l'utilisateur a bien les permissions
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
