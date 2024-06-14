import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Serveur } from '../../models/serveur.type';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ServeurComponent } from '../serveur/serveur.component';
import { Utilisateur } from '../../models/utilisateur.type';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltipModule, ServeurComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent {
  http: HttpClient = inject(HttpClient);
  listeServeur: Serveur[] = [];
  selectedServer: Serveur | undefined;
  currentUser: Utilisateur | undefined;

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Serveur[]>('http://localhost:3000/serveur/possede')
        .subscribe((listeServeur) => (this.listeServeur = listeServeur));
      this.http
        .get<Utilisateur>('http://localhost:3000/user/by-token')
        .subscribe((user) => (this.currentUser = user));
    }
  }

  changeSelectedServer(serveur: Serveur) {
    this.selectedServer = serveur;
  }
}
