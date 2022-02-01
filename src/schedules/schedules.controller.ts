import { Controller, Get, Param, Query } from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedule')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) { }

  @Get()
  getSchedule(@Query('date') date: string, @Query('sportId') sportId: number, @Query('language') language: string): string {
    return `${date} ${sportId} ${language}`;
  }
}
