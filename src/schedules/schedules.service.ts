import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { ScheduleDto } from 'src/dtos/schedule.dto';
import { Schedule } from 'src/interfaces/schedule.interface';

@Injectable()
export class SchedulesService {
  constructor(private httpService: HttpService) {}
  getSchedule(
    date: string,
    sportId: string,
    language: string
  ): Observable<AxiosResponse<Schedule>> {
    return this.httpService.get(
      `https://statsapi.mlb.com/api/v1/schedule?date=${date}&sportId=${sportId}&language=${language}`
    );
  }

  toDTO(schedule: Schedule): ScheduleDto {
    const scheduleDto = new ScheduleDto();

    scheduleDto.copyright = schedule.copyright;
    scheduleDto.totalItems = schedule.totalItems;
    scheduleDto.totalGames = schedule.totalGames;
    scheduleDto.totalGamesInProgress = schedule.totalGamesInProgress;
    scheduleDto.dates = schedule.dates;

    return scheduleDto;
  }
}
