import { Body, Controller, Get, Post } from '@nestjs/common';
import { ServeurService } from './serveur.service';

@Controller('serveur')
export class ServeurController {
  constructor(private readonly serveurService: ServeurService) {}

  @Get()
  findAll() {
    return this.serveurService.findAll();
  }

  @Post()
  async create(@Body() createServeurDto: any) {
    return this.serveurService.create(createServeurDto);
  }
}
