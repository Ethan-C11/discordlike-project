import { Component, ViewChild, inject } from '@angular/core';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Serveur } from '../../models/serveur.type';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { Utilisateur } from '../../models/utilisateur.type';

@Component({
  selector: 'app-edition-serveur',
  standalone: true,
  imports: [
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortHeader,
    MatSort,
    MatLabel,
  ],
  templateUrl: './edition-serveur.component.html',
  styleUrl: './edition-serveur.component.scss',
})
export class EditionServeurComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);
  currentUser: Utilisateur | undefined;

  dataSource: any;

  @ViewChild(MatSort) sort?: MatSort;

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Utilisateur>('http://localhost:3000/user/by-token')
        .subscribe((user) => {
          this.http
            .get<
              Serveur[]
            >('http://localhost:3000/serveur/not-banned/' + user._id)
            .subscribe((listeServeur) => {
              this.dataSource = new MatTableDataSource(listeServeur);

              if (this.sort) {
                this.dataSource.sort = this.sort;
              }
            });
        });
    }
  }

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: ['', [Validators.maxLength(100)]],
    public: [false, []],
    urlLogo: ['', []],
  });

  onAjoutServeur() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:3000/serveur', this.formulaire.value)
        .subscribe((nouveauServeur) => {
          const serveur: Serveur = Object.assign(nouveauServeur);
          this.onRejoindreServeur(serveur);
          this.snackBar.open('Le serveur a bien été ajouté', undefined, {
            duration: 3000,
          });
          const body = {
            nom: 'Général',
            serveurId: serveur._id,
          };
          this.http.post('http://localhost:3000/salon', body).subscribe();
          this.router.navigateByUrl('/principal');
        });
    }
  }

  onRejoindreServeur(serveur: Serveur) {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .post('http://localhost:3000/rejoindre-serveur', serveur)
        .subscribe((nouveauServeur) => {
          this.snackBar.open('Vous avez rejoins le serveur', undefined, {
            duration: 3000,
          });

          this.router.navigateByUrl('/principal');
        });
    }
  }
}
