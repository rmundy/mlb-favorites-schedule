import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';

@Module({
  imports: [HttpModule],
  controllers: [SchedulesController],
  providers: [SchedulesService]
})
export class SchedulesModule { }
