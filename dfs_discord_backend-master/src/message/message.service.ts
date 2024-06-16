// src/cats/cats.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from '../utilisateur/utilisateur.schema';
import { Salon, SalonDocument } from '../salon/salon.schema';
import { Serveur, ServeurDocument } from '../serveur/serveur.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
    @InjectModel(Salon.name)
    private salonModel: Model<SalonDocument>,
    @InjectModel(Serveur.name)
    private serveurModel: Model<ServeurDocument>,
  ) {}

  async create(createdMessageDto: any, id: string): Promise<Message> {
    const user: Utilisateur = await this.utilisateurModel.findOne({ _id: id });
    createdMessageDto.userId = id;
    const salon: Salon = await this.salonModel.findOne({
      _id: createdMessageDto.salonId,
    });
    if (!user.serveurs.includes(salon.serveurId)) {
      throw new HttpException('Accès Refusé', 403, {
        cause: "Vous n'êtes pas sur ce serveur",
      });
    }
    const createdMessage = new this.messageModel(createdMessageDto);
    return createdMessage.save();
  }

  async findAllOfSalon(salonId: string, userId: string): Promise<Message[]> {
    const user: Utilisateur = await this.utilisateurModel.findOne({
      _id: userId,
    });
    const salon: Salon = await this.salonModel.findOne({
      _id: salonId,
    });

    console.log(user, salon, user.serveurs.includes(salon.serveurId));
    if (!user.serveurs.includes(salon.serveurId)) {
      throw new HttpException('Accès Refusé', 403, {
        cause: "Vous n'êtes pas sur ce serveur",
      });
    }
    return this.messageModel.find({ salonId: salonId });
  }
}
