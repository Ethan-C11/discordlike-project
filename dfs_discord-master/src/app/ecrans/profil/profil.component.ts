import { Component, inject } from '@angular/core';
import { Utilisateur } from '../../models/utilisateur.type';
import { Serveur } from '../../models/serveur.type';
import { HttpClient } from '@angular/common/http';
import { MatTooltip } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatTooltip,
    RouterLink,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
    MatInput,
    MatError,
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  currentUser: Utilisateur | undefined;
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    email: [
      '',
      [Validators.maxLength(100), Validators.required, Validators.email],
    ],
    urlAvatar: ['', [Validators.required]],
  });
  ngOnInit() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<Utilisateur>('http://localhost:3000/user/by-token')
        .subscribe((user) => {
          this.currentUser = user;
          this.resetForm();
        });
    }
  }

  deconnexion() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      localStorage.removeItem('jwt');
    }
    this.router.navigateByUrl('/connexion');
  }

  retourMenuPrincipal() {
    this.router.navigateByUrl('/principal');
  }

  editUser() {
    this.http
      .post('http://localhost:3000/user/modification', this.formulaire.value)
      .subscribe((utilisateur) => {
        this.snackBar.open('Votre profil a été modifié', undefined, {
          duration: 3000,
        });
        this.ngOnInit();
      });
  }

  resetForm() {
    this.formulaire.setValue({
      nom: this.currentUser?.nom,
      email: this.currentUser?.email,
      urlAvatar: this.currentUser?.urlAvatar,
    });
  }
}
