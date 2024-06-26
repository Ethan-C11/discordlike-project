import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth.guard';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createMessageDto: any, @Request() requete) {
    const id = requete.user.subId;
    return this.messageService.create(createMessageDto, id);
  }

  @UseGuards(AuthGuard)
  @Get(':salon')
  findAll(@Param('salon') salonId: string, @Request() requete) {
    const userId = requete.user.subId;
    return this.messageService.findAllOfSalon(salonId, userId);
  }
}
