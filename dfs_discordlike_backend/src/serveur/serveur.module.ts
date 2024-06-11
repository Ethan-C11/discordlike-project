import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Serveur, ServeurSchema } from './serveur.schema';
import { ServeurController } from './serveur.controller';
import { ServeurService } from './serveur.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Serveur.name, schema: ServeurSchema }]),
  ],
  providers: [ServeurService],
  controllers: [ServeurController],
})
export class ServeurModule {}
