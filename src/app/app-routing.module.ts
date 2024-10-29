import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeGuard } from './home.guard';
import { UsersmanagementComponent } from './usersmanagement/usersmanagement.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [HomeGuard], // Guard pour la page d'accueil
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        //canActivate: [UserGuard], // Vérification de l'utilisateur avant d'accéder au dashboard
        children: [
          {
            path: 'usersmanagement',
            component: UsersmanagementComponent,
            canActivate: [AdminGuard], // Vérification des permissions admin pour gérer les utilisateurs
          },
        ],
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: 'home' }, // Gestion des routes non trouvées
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
