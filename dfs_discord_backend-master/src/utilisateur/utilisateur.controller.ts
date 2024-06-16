import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/auth.guard';

@Controller()
export class UtilisateurController {
  constructor(
    private readonly utilisateurService: UtilisateurService,
    private readonly jwtService: JwtService,
  ) {}

  // @Get()
  // findAll() {
  //   return this.utilisateurService.findAll();
  // }

  @Post('inscription')
  async inscription(@Body() createUtilisateurDto: any) {
    //TODO : vérifier les donnée (regles mot de passe, email unique ...)

    return this.utilisateurService.create(createUtilisateurDto);
  }

  @Post('user/modification')
  @UseGuards(AuthGuard)
  modifUser(@Request() requete, @Body() modifUserDto) {
    const userId = requete.user.subId;
    return this.utilisateurService.update(modifUserDto, userId);
  }

  @Post('login')
  async create(@Body() utilisateurDto: any) {
    const utilisateur =
      await this.utilisateurService.getByEmailAndClearPassword(
        utilisateurDto.email,
        utilisateurDto.password,
      );

    const payload = {
      sub: utilisateur.email,
      subId: utilisateur._id,
    };

    return await this.jwtService.signAsync(payload);
  }

  @Post('rejoindre-serveur')
  @UseGuards(AuthGuard)
  async rejoindreServeur(
    @Body() serveurArejoindreDto: any,
    @Request() requete,
  ) {
    const id = requete.user.subId;

    return this.utilisateurService.rejoindreServeur(
      id,
      serveurArejoindreDto._id,
    );
  }

  @Get('user/by-token')
  @UseGuards(AuthGuard)
  async getUserByToken(@Request() requete) {
    const id = requete.user.subId;
    return this.utilisateurService.findByToken(id);
  }

  @Get('user/:id')
  @UseGuards(AuthGuard)
  findById(@Param('id') id: string) {
    return this.utilisateurService.findById(id);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  findAll() {
    return this.utilisateurService.findAll();
  }

  @Get('user/server/:id')
  @UseGuards(AuthGuard)
  findAllInServer(@Param('id') id: string) {
    return this.utilisateurService.findAllInServer(id);
  }
}
