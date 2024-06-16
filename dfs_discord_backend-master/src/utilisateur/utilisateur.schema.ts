import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Serveur } from 'src/serveur/serveur.schema';

export type UtilisateurDocument = Utilisateur & Document;

@Schema()
export class Utilisateur {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  urlAvatar: string;

  @Prop()
  serveurs: string[];

  _id: string;
}

export const UtilisateurSchema = SchemaFactory.createForClass(Utilisateur);
