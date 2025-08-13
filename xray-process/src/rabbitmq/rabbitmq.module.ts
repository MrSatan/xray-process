import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('RABBITMQ_URL');
        if (!uri) {
          throw new Error('RABBITMQ_URL is not defined');
        }
        return {
          exchanges: [
            {
              name: 'xray-exchange',
              type: 'topic',
            },
          ],
          uri,
          connectionInitOptions: { wait: false },
          queues: [
            {
              name: 'xray-queue',
              routingKey: 'xray-routing-key',
              exchange: 'xray-exchange',
            },
          ],
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqModule {}
