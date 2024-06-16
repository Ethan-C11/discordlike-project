import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import {
  Utilisateur,
  UtilisateurSchema,
} from '../utilisateur/utilisateur.schema';
import { Salon, SalonSchema } from '../salon/salon.schema';
import { Serveur, ServeurSchema } from '../serveur/serveur.schema';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Utilisateur.name, schema: UtilisateurSchema },
      { name: Salon.name, schema: SalonSchema },
      { name: Serveur.name, schema: ServeurSchema },
    ]),
  ],
})
export class MessageModule {}
