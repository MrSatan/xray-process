import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import * as xrayData from './x-ray.json';

@Injectable()
export class ProducerService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async publishXrayData() {
    this.amqpConnection.publish(
      'xray-exchange',
      'xray-routing-key',
      xrayData,
    );
  }
}
