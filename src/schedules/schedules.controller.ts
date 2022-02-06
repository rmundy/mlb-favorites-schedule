import { Controller, Get, Query } from '@nestjs/common';
import { map, Observable, take } from 'rxjs';
import { Schedule } from 'src/interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';

@Controller('schedule')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  getSchedule(
    @Query('teamId') teamId: string,
    @Query('date') date: string,
    @Query('sportId') sportId: string,
    @Query('language') language: string
  ): Observable<Schedule> {
    return this.schedulesService.getSchedule(date, sportId, language).pipe(
      take(1),
      map((response) => this.schedulesService.reSort(response.data as Schedule, teamId))
    );
  }
}
