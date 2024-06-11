import {Component, inject} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {Router, RouterLink} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Serveur} from "../../models/serveur.type";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatTooltip],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  http: HttpClient = inject(HttpClient);
  router : Router = inject(Router);
  listeServeur: Serveur[] = [];

  ngOnInit() {
    this.http.get<Serveur[]>
    ("http://localhost:3000/serveur")
      .subscribe(listeServeur => this.listeServeur = listeServeur)
  }

  redirectCreationServeur(){
    this.router.navigateByUrl('/edition-serveur')
  }
}
