// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from '../utilisateur/utilisateur.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

  async create(createdMessageDto: any, email: string): Promise<Message> {
    const user: Utilisateur = await this.utilisateurModel.findOne({ email });
    createdMessageDto.userId = user._id;
    const createdMessage = new this.messageModel(createdMessageDto);
    return createdMessage.save();
  }

  async findAllOfSalon(salonId: string): Promise<Message[]> {
    return this.messageModel.find({ salonId: salonId });
  }
}
