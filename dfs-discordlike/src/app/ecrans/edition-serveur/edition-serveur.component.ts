import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInput} from "@angular/material/input";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edition-serveur',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInput,
    MatError,
    MatSnackBarModule
  ],
  templateUrl: './edition-serveur.component.html',
  styleUrl: './edition-serveur.component.css'
})
export class EditionServeurComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router : Router = inject(Router);
  snackBar : MatSnackBar = inject(MatSnackBar)

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: ['', Validators.maxLength(100)],
    public: [false, []],
    urlLogo: [
      '', //https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png
      [],
    ]
  });

  onAjoutServeur() {
    if (this.formulaire.valid) {
      this.http.post('http://localhost:3000/serveur', this.formulaire.value)
        .subscribe(nouveauServeur => {
          this.snackBar.open("Opératie réussie", undefined, {duration:3000});
          this.router.navigateByUrl("/home")
        })
    }
  }
}
