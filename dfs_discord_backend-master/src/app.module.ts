import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeurModule } from './serveur/serveur.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { JwtModule } from '@nestjs/jwt';
import { SalonModule } from './salon/salon.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/dfs_discord'),
    ServeurModule,
    UtilisateurModule,
    SalonModule,
    MessageModule,
    JwtModule.register({
      secret: 'azerty',
      global: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
