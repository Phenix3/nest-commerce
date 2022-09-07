import { Document, SchemaTypes } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Item } from './item.schema';

export type CartDocument = Cart & Document;

export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  items: Item[];

  @Prop()
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
