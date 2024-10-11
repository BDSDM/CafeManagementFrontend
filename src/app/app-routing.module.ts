import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Rend le composant Home pour la racine '/'
  { path: 'home', component: HomeComponent }, // Route explicite pour /home
  { path: '**', redirectTo: '' }, // Redirige toutes les autres routes vers la racine
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
