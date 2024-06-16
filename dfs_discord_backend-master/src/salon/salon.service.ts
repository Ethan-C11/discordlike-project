// src/cats/cats.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salon, SalonDocument } from './salon.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from '../utilisateur/utilisateur.schema';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

  async create(createdSalonDto: any, userId: string): Promise<Salon> {
    const user: Utilisateur = await this.utilisateurModel.findOne({
      _id: userId,
    });
    if (!user.serveurs.includes(createdSalonDto.serveurId)) {
      throw new HttpException('Accès Refusé', 403, {
        cause: "Vous n'êtes pas sur ce serveur",
      });
    }
    const createdSalon = new this.salonModel(createdSalonDto);
    return createdSalon.save();
  }

  async findAllOfServer(serveurId: string, userId: string): Promise<Salon[]> {
    const user: Utilisateur = await this.utilisateurModel.findOne({
      _id: userId,
    });
    if (!user.serveurs.includes(serveurId)) {
      throw new HttpException('Accès Refusé', 403, {
        cause: "Vous n'êtes pas sur ce serveur",
      });
    }
    return this.salonModel.find({ serveurId: serveurId });
  }
}
