import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { DatabaseModule } from './database/database.module';
import { SignalsModule } from './signals/signals.module';

@Module({
  imports: [AppConfigModule, RabbitmqModule, DatabaseModule, SignalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
