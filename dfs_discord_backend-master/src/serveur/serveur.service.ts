// src/cats/cats.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Serveur, ServeurDocument } from './serveur.schema';
import {
  Utilisateur,
  UtilisateurDocument,
} from 'src/utilisateur/utilisateur.schema';
import * as util from 'util';

@Injectable()
export class ServeurService {
  constructor(
    @InjectModel(Serveur.name) private serveurModel: Model<ServeurDocument>,
    @InjectModel(Utilisateur.name)
    private utilisateurModel: Model<UtilisateurDocument>,
  ) {}

  async create(createdServeurDto: any, ownerId: string): Promise<Serveur> {
    let urlLogo = createdServeurDto.urlLogo;
    if (urlLogo == '' || urlLogo == undefined)
      urlLogo =
        'https://api.dicebear.com/8.x/initials/svg?seed=' +
        createdServeurDto.nom;
    const body = {
      nom: createdServeurDto.nom,
      description: createdServeurDto.description,
      public: createdServeurDto.public,
      urlLogo: urlLogo,
      ownerId: ownerId,
      blacklist: [''],
    };
    const createdServeur = new this.serveurModel(body);
    return createdServeur.save();
  }

  async findAllPublic(): Promise<Serveur[]> {
    return this.serveurModel.find({ public: true });
  }

  async findAllServerOfUser(id: string): Promise<Serveur[]> {
    const utilisateur = await this.utilisateurModel.findOne({ _id: id });

    const serveurs = await this.serveurModel.find({
      _id: { $in: utilisateur.serveurs },
    });

    return serveurs;
  }

  async findAllBannedInServer(serveurId: string): Promise<Utilisateur[]> {
    const serveur: Serveur = await this.serveurModel.findOne({
      _id: serveurId,
    });
    return this.utilisateurModel.find({ _id: serveur.blacklist }).exec();
  }

  async ban(ownerId: string, serverId: string, targetId: string) {
    const owner: Utilisateur = await this.utilisateurModel.findOne({
      _id: ownerId,
    });
    const server: Serveur = await this.serveurModel.findOne({ _id: serverId });

    if (server.ownerId != owner._id) {
      throw new HttpException('Accès Refusé', 403, {
        cause: "Vous n'êtes pas le propriétaire de ce serveur",
      });
    } else if (server.ownerId == targetId) {
      throw new HttpException('Accès Refusé', 403, {
        cause: 'Vous ne pouvez pas bannir le propriétaire du serveur',
      });
    }

    const utilisateur = await this.utilisateurModel.findOneAndUpdate(
      { _id: targetId },
      { $pull: { serveurs: serverId } },
      { new: true },
    );

    const serverUpdate = await this.serveurModel.findOneAndUpdate(
      { _id: server._id },
      { $addToSet: { blacklist: targetId } },
      { new: true },
    );

    return {
      server: serverUpdate,
      user: utilisateur,
    };
  }

  async deban(ownerId: string, serverId: string, targetId: string) {
    const owner: Utilisateur = await this.utilisateurModel.findOne({
      _id: ownerId,
    });
    const server: Serveur = await this.serveurModel.findOne({ _id: serverId });

    if (server.ownerId != owner._id) {
      throw new HttpException('Accès Refusé', 403, {
        cause: "Vous n'êtes pas le propriétaire de ce serveur",
      });
    } else if (server.ownerId == targetId) {
      throw new HttpException('Accès Refusé', 403, {
        cause:
          'Il est impossible de bannir le propriétaire du serveur, il est donc naturellement pas possible de tenter de le debannir',
      });
    }

    const utilisateur = await this.utilisateurModel.findOneAndUpdate(
      { _id: targetId },
      { $addToSet: { serveurs: serverId } },
      { new: true },
    );

    const serverUpdate = await this.serveurModel.findOneAndUpdate(
      { _id: server._id },
      { $pull: { blacklist: targetId } },
      { new: true },
    );

    return {
      server: serverUpdate,
      user: utilisateur,
    };
  }

  async findAllPublicWhereNotBanned(idUser: string) {
    const serveurs = await this.serveurModel.find({
      blacklist: { $ne: idUser },
    });

    return serveurs;
  }
}
