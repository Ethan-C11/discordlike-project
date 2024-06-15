import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { ServeurService } from './serveur.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('serveur')
export class ServeurController {
  constructor(private readonly serveurService: ServeurService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.serveurService.findAllPublic();
  }

  @Get('not-banned/:idUser')
  @UseGuards(AuthGuard)
  findAllWhereNotBanned(@Param('idUser') idUser: string) {
    return this.serveurService.findAllPublicWhereNotBanned(idUser);
  }

  @Get('/possede')
  @UseGuards(AuthGuard)
  findAllServerOfUser(@Request() requete) {
    return this.serveurService.findAllServerOfUser(requete.user.subId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createServeurDto: any, @Request() requete) {
    return this.serveurService.create(createServeurDto, requete.user.subId);
  }

  @Post('ban')
  @UseGuards(AuthGuard)
  ban(@Body() banDto: any, @Request() requete) {
    const ownerId = requete.user.subId;
    const serverId = banDto.server;
    const targetId = banDto.target;

    return this.serveurService.ban(ownerId, serverId, targetId);
  }

  @Post('deban')
  @UseGuards(AuthGuard)
  deban(@Body() debanDto: any, @Request() requete) {
    const ownerId = requete.user.subId;
    const serverId = debanDto.server;
    const targetId = debanDto.target;

    return this.serveurService.deban(ownerId, serverId, targetId);
  }

  @Get('/banni/:id')
  @UseGuards(AuthGuard)
  findAllBannedInServer(@Param('id') id: string) {
    return this.serveurService.findAllBannedInServer(id);
  }
}
