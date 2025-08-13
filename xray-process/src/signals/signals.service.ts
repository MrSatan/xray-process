import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Signal, SignalDocument } from './schemas/signal.schema';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class SignalsService {
  constructor(
    @InjectModel(Signal.name) private signalModel: Model<SignalDocument>,
  ) {}

  @RabbitSubscribe({
    exchange: 'xray-exchange',
    routingKey: 'xray-routing-key',
    queue: 'xray-queue',
  })
  public async handleXrayData(msg: any) {
    try {
      const deviceId = Object.keys(msg)[0];
      const { data, time } = msg[deviceId];
      const dataLength = data.length;
      const dataVolume = JSON.stringify(data).length;

      const newSignal = new this.signalModel({
        deviceId,
        time,
        dataLength,
        dataVolume,
        data,
      });

      await newSignal.save();
    } catch (error) {
      const deviceId = msg ? Object.keys(msg)[0] : 'unknown';
      console.error(
        `Error processing xray data for deviceId: ${deviceId}`,
        error,
      );
    }
  }

  async create(signal: Signal): Promise<Signal> {
    const newSignal = new this.signalModel(signal);
    return newSignal.save();
  }

  async findAll(): Promise<Signal[]> {
    const data = await this.signalModel.find().exec()
    console.log(data);
    return data;;
  }

  async findOne(id: string): Promise<Signal> {
    const signal = await this.signalModel.findById(id).exec();
    if (!signal) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return signal;
  }

  async update(id: string, signal: Signal): Promise<Signal> {
    const updatedSignal = await this.signalModel
      .findByIdAndUpdate(id, signal, { new: true })
      .exec();
    if (!updatedSignal) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return updatedSignal;
  }

  async delete(id: string): Promise<any> {
    const result = await this.signalModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Signal with id ${id} not found`);
    }
    return result;
  }

  async findByDeviceId(deviceId: string): Promise<Signal[]> {
    return this.signalModel.find({ deviceId }).exec();
  }
}
