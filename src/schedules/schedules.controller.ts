import { Controller, Get, Query } from '@nestjs/common';
import { map, Observable, take, tap } from 'rxjs';
import { ScheduleDto } from 'src/dtos/schedule.dto';
import { Schedule } from 'src/interfaces/schedule.interface';
import { SchedulesService } from './schedules.service';

@Controller('schedule')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  getSchedule(
    @Query('date') date: string,
    @Query('sportId') sportId: string,
    @Query('language') language: string
  ): Observable<ScheduleDto> {
    return this.schedulesService.getSchedule(date, sportId, language).pipe(
      take(1),
      map((response) => this.schedulesService.toDTO(response.data as Schedule)),
      tap((d) => console.log(d.copyright))
    );
  }
}
