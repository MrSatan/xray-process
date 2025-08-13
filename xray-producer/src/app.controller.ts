import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ProducerService } from './producer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly producerService: ProducerService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('publish')
  async publish() {
    await this.producerService.publishXrayData();
    return { message: 'X-ray data published' };
  }
}
