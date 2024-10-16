import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent, // La page Home
    children: [
      {
        path: 'dashboard', // Sous-route de Home
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule), // Charge DashboardModule
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige vers home par défaut
  { path: '**', redirectTo: 'home' }, // Redirige toutes les routes inconnues vers home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
