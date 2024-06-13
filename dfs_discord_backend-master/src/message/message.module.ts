import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import {
  Utilisateur,
  UtilisateurSchema,
} from '../utilisateur/utilisateur.schema';

@Module({
  providers: [MessageService],
  controllers: [MessageController],
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Utilisateur.name, schema: UtilisateurSchema },
    ]),
  ],
})
export class MessageModule {}
