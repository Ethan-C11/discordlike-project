import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, maxlength: 2000 })
  message: string;

  @Prop({ required: true, maxlength: 100 })
  salonId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
