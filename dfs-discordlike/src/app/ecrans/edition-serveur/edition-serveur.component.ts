import {Component, inject} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInput} from "@angular/material/input";

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
    MatError
  ],
  templateUrl: './edition-serveur.component.html',
  styleUrl: './edition-serveur.component.css'
})
export class EditionServeurComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);

  formulaire: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: ['', Validators.maxLength(100)],
    public : [false, []],
  });

  onAjoutServeur() {

  }
}
