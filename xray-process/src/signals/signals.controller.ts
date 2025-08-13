import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SignalsService } from './signals.service';
import { Signal } from './schemas/signal.schema';

@Controller('signals')
export class SignalsController {
  constructor(private readonly signalsService: SignalsService) {}

  @Post()
  async create(@Body() signal: Signal): Promise<Signal> {
    return this.signalsService.create(signal);
  }

  @Get()
  async findAll(): Promise<Signal[]> {
    return this.signalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Signal> {
    return this.signalsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() signal: Signal,
  ): Promise<Signal> {
    return this.signalsService.update(id, signal);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.signalsService.delete(id);
  }

  @Get('device/:deviceId')
  async findByDeviceId(
    @Param('deviceId') deviceId: string,
  ): Promise<Signal[]> {
    return this.signalsService.findByDeviceId(deviceId);
  }
}
