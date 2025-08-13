import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SignalDocument = Signal & Document;

@Schema()
export class Signal {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  time: number;

  @Prop({ required: true })
  dataLength: number;

  @Prop({ required: true })
  dataVolume: number;

  @Prop({ type: [MongooseSchema.Types.Mixed] })
  data: (number | number[])[];
}

export const SignalSchema = SchemaFactory.createForClass(Signal);
