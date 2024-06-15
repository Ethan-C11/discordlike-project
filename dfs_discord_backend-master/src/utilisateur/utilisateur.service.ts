import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Utilisateur, UtilisateurDocument } from './utilisateur.schema';
import * as bcrypt from 'bcrypt';
import { Serveur, ServeurDocument } from '../serveur/serveur.schema';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
    @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
  ) {}

  async getByEmailAndClearPassword(
    email: string,
    clearPassword: string,
  ): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurModel.findOne({ email: email });

    if (utilisateur && bcrypt.compare(clearPassword, utilisateur.password)) {
      return utilisateur;
    }

    return null;
  }

  async create(createdUtilisateurDto: any): Promise<Utilisateur> {
    const createdUtilisateur = new this.utilisateurModel(createdUtilisateurDto);

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createdUtilisateur.password, saltOrRounds);
    createdUtilisateur.password = hash;

    return createdUtilisateur.save();
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurModel.find().exec();
  }

  async findAllInServer(serveur: string): Promise<Utilisateur[]> {
    return this.utilisateurModel.find({ serveurs: serveur }).exec();
  }

  async findById(id: string): Promise<Utilisateur[]> {
    return this.utilisateurModel.find({ _id: id });
  }

  async rejoindreServeur(
    id: string,
    idServeurArejoindre: number,
  ): Promise<Utilisateur> {
    const serveur: Serveur = await this.serveurModel.findOne({
      _id: idServeurArejoindre,
    });
    if (serveur.blacklist.includes(id)) {
      throw new HttpException('Accès Refusé', 403, {
        cause: 'Vous êtes banni de ce serveur',
      });
    }

    const utilisateur = await this.utilisateurModel.findOneAndUpdate(
      { _id: id },
      { $addToSet: { serveurs: idServeurArejoindre } }, // $addToSet évite les duplications
      { new: true }, // Retourner le document mis à jour
    );

    return utilisateur;
  }

  async findByToken(id: any): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurModel.findOne({ _id: id });
    return utilisateur;
  }
}
