import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerService } from './producer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProducerService],
})
export class AppModule {}
