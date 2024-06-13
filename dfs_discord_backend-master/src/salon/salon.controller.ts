import { Body, Controller, Get, Post, UseGuards, Param } from '@nestjs/common';
import { SalonService } from './salon.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('salon')
export class SalonController {
  constructor(private readonly salonService: SalonService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    console.log(id);

    return this.salonService.findAllOfServer(id);
  }

  @Post()
  async create(@Body() createSalonDto: any) {
    return this.salonService.create(createSalonDto);
  }
}
