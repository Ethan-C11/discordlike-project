import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Salon, SalonSchema } from './salon.schema';
import { SalonController } from './salon.controller';
import { SalonService } from './salon.service';
import {
  Utilisateur,
  UtilisateurSchema,
} from '../utilisateur/utilisateur.schema';

@Module({
  providers: [SalonService],
  controllers: [SalonController],
  imports: [
    MongooseModule.forFeature([
      { name: Salon.name, schema: SalonSchema },
      { name: Utilisateur.name, schema: UtilisateurSchema },
    ]),
  ],
})
export class SalonModule {}
