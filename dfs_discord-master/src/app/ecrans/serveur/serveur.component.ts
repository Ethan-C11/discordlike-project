import { Component, inject, Input } from '@angular/core';
import { Serveur } from '../../models/serveur.type';
import { Salon } from '../../models/salon.type';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Message } from '../../models/message.type';
import { Utilisateur } from '../../models/utilisateur.type';

@Component({
  selector: 'app-serveur',
  standalone: true,
  imports: [
    MatDialogModule,
    MatInput,
    MatFormField,
    ReactiveFormsModule,
    MatLabel,
  ],
  templateUrl: './serveur.component.html',
  styleUrl: './serveur.component.scss',
})
export class ServeurComponent {
  @Input()
  currentServer: Serveur | undefined;
  currentSalon: Salon | undefined;
  listeSalon: Salon[] | undefined;
  listeMessage: Message[] | undefined;
  listeUserServer: Utilisateur[] | undefined;
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);
  formBuilder: FormBuilder = inject(FormBuilder);
  snackBar: MatSnackBar = inject(MatSnackBar);

  formulaireSalon: FormGroup = this.formBuilder.group({
    nom: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: ['', [Validators.maxLength(100)]],
  });

  formulaireMessage: FormGroup = this.formBuilder.group({
    message: ['', [Validators.required, Validators.maxLength(2000)]],
  });

  ngOnInit() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.handleServerSelection();
    }
  }

  ngOnChanges() {
    this.handleServerSelection();
  }

  handleServerSelection() {
    if (this.currentServer != undefined) {
      this.http
        .get<Salon[]>('http://localhost:3000/salon/' + this.currentServer._id)
        .subscribe((listeSalon) => (this.listeSalon = listeSalon));
      this.http
        .get<
          Utilisateur[]
        >('http://localhost:3000/user/server/' + this.currentServer._id)
        .subscribe(
          (listeUtilisateur) => (this.listeUserServer = listeUtilisateur),
        );
      this.currentSalon = undefined;
      this.listeMessage = undefined;
    }
  }

  handleCreationSalon() {
    const body: any = {
      nom: this.formulaireSalon.value.nom,
      description: this.formulaireSalon.value.description,
      serveurId: this.currentServer?._id,
    };

    console.log(body);
    if (this.currentServer != undefined) {
      if (this.formulaireSalon.valid) {
        console.log(body);
        this.http
          .post('http://localhost:3000/salon', body)
          .subscribe((nouveauSalon) => {
            this.snackBar.open('Le salon a bien été ajouté', undefined, {
              duration: 3000,
            });
            this.ngOnInit();
          });
      }
    }
  }

  handleSelectionSalon(salon: undefined | Salon) {
    if (salon == undefined) this.currentSalon = undefined;
    else {
      this.currentSalon = salon;
      this.handleFetchMessage();
    }
  }

  handleFetchMessage() {
    if (this.currentSalon != undefined) {
      this.http
        .get<
          Message[]
        >('http://localhost:3000/message/' + this.currentSalon._id)
        .subscribe((listeMessage) => {
          listeMessage.forEach((message: Message) => {
            let user = this.listeUserServer?.filter((user) => {
              return user._id == message.userId;
            })[0];
            if (user != undefined) message.userName = user.nom;
          });
          this.listeMessage = listeMessage;
        });
    }
  }

  handleEnvoiMessage() {
    if (this.formulaireMessage.valid) {
      const body: any = {
        message: this.formulaireMessage.value.message,
        salonId: this.currentSalon?._id,
      };
      this.http
        .post('http://localhost:3000/message', body)
        .subscribe((nouveauSalon) => {
          this.snackBar.open('Message envoyé', undefined, {
            duration: 1000,
          });
          this.formulaireMessage.reset();
          this.handleFetchMessage();
        });
    }
  }
}
