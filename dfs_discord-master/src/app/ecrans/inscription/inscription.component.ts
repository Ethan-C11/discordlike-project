import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RuleComponent } from '../../components/rule/rule.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
  imports: [
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    RuleComponent,
  ],
})
export class InscriptionComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http = inject(HttpClient);
  router: Router = inject(Router);
  snackBar: MatSnackBar = inject(MatSnackBar);

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/),
      ],
    ],
    confirmationPassword: ['', [Validators.required]],
  });

  passwordIdentique: boolean = true;

  verifierMotDePasseIdentique() {
    if (this.formulaire.get('confirmationPassword')?.dirty) {
      this.passwordIdentique =
        this.formulaire.get('password')?.value ==
        this.formulaire.get('confirmationPassword')?.value;
    }
  }

  onInscription() {
    if (this.formulaire.valid && this.passwordIdentique) {
      this.http
        .post('http://localhost:3000/inscription', this.formulaire.value)
        .subscribe((utilisateur) => {
          this.snackBar.open(
            'Vous êtes inscrit, vous pouvez vous connecter avec vos identifiants',
            undefined,
            {
              duration: 3000,
            },
          );

          this.router.navigateByUrl('/connexion');
        });
    }
  }
}
