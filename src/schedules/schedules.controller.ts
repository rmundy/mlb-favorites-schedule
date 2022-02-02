import { Controller, Get, Param, Query } from '@nestjs/common';
import { map, Observable, of, take, tap } from 'rxjs';
import { SchedulesService } from './schedules.service';

@Controller('schedule')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) { }

  @Get()
  getSchedule(@Query('date') date: string, @Query('sportId') sportId: string, @Query('language') language: string): Observable<string> {
    return this.schedulesService.getSchedule(date, sportId, language).pipe(take(1), map(response => JSON.stringify(response.data)
    ));
  }
}
