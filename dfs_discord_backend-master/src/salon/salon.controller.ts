import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Request,
} from '@nestjs/common';
import { SalonService } from './salon.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string, @Request() requete) {
    const userId = requete.user.subId;

    return this.salonService.findAllOfServer(id, userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createSalonDto: any, @Request() requete) {
    const userId = requete.user.subId;

    return this.salonService.create(createSalonDto, userId);
  }
}
