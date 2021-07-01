import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// export type CityDocument = City & mongoose.Document

@Schema({ timestamps: true })
export class InsType extends mongoose.Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: 'avatar.png' })
  image_url: string;
}

export const InsTypeSchema = SchemaFactory.createForClass(InsType);
