import { Routes } from '@angular/router';
import {ConnexionComponent} from "./ecrans/connexion/connexion.component";
import {ProfilComponent} from "./ecrans/profil/profil.component";
import {HomeComponent} from "./ecrans/home/home.component";
import {EditionServeurComponent} from "./ecrans/edition-serveur/edition-serveur.component";
import {Page404Component} from "./ecrans/page404/page404.component";

export const routes: Routes = [
  {path: 'home', component : HomeComponent},
  {path: 'connexion', component : ConnexionComponent},
  {path: 'profil', component : ProfilComponent},
  {path: 'edition-serveur', component : EditionServeurComponent},
  {path: 'ajouter-serveur', component : EditionServeurComponent},
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: '**', component : Page404Component},
];
