import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BaseDocument = Base & Document;

@Schema()
export class Base {
  @Prop()
  image: string;
  @Prop(
    raw({
      firstName: { type: String },
      lastName: { type: String },
      avatar: { type: String },
    }),
  )
  author: Record<string, any>;
  @Prop()
  name: string;
  @Prop()
  address: string;
  @Prop()
  price: string[];
  @Prop()
  images: string[];
  @Prop()
  info: any[];
  @Prop()
  type: string[];
  @Prop()
  period: string[];
  @Prop()
  coords: any[];
  @Prop()
  description: any[];
  @Prop()
  amenities: any[];
  @Prop()
  reviews: any[];
}

export const BaseSchema = SchemaFactory.createForClass(Base);
