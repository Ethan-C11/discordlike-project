// src/cats/cats.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Salon, SalonDocument } from './salon.schema';

@Injectable()
export class SalonService {
  constructor(
    @InjectModel(Salon.name) private salonModel: Model<SalonDocument>,
  ) {}

  async create(createdSalonDto: any): Promise<Salon> {
    const createdSalon = new this.salonModel(createdSalonDto);
    return createdSalon.save();
  }

  async findAllOfServer(serveurId: string): Promise<Salon[]> {
    return this.salonModel.find({ serveurId: serveurId });
  }
}
