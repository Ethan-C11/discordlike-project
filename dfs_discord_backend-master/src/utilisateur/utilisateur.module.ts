import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Utilisateur, UtilisateurSchema } from './utilisateur.schema';
import { UtilisateurController } from './utilisateur.controller';
import { UtilisateurService } from './utilisateur.service';
import { Serveur, ServeurSchema } from '../serveur/serveur.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Utilisateur.name, schema: UtilisateurSchema },
      { name: Serveur.name, schema: ServeurSchema },
    ]),
  ],
  providers: [UtilisateurService],
  controllers: [UtilisateurController],
})
export class UtilisateurModule {}
