import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { validateOrReject } from 'class-validator';
import { Observable } from 'rxjs';
import { ScheduleDto } from 'src/dtos/schedule.dto';
import { Game } from 'src/interfaces/game.interface';
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
    scheduleDto.totalEvents = schedule.totalEvents;
    scheduleDto.totalGamesInProgress = schedule.totalGamesInProgress;
    scheduleDto.dates = schedule.dates;

    validateOrReject(scheduleDto).catch((errors) => {
      return {
        error: `Promise rejected (validation failed). Errors: ${errors}`
      };
    });

    return scheduleDto;
  }

  reSort(schedule: Schedule, teamId: string): Schedule {
    if (!schedule || !teamId) {
      return schedule;
    }

    const games = schedule.dates[0].games;
    const favoriteGames = games.filter(
      (game: Game) =>
        game.teams.away.team.id === Number(teamId) || game.teams.home.team.id === Number(teamId)
    );
    const otherGames = games.filter(
      (game: Game) =>
        game.teams.away.team.id !== Number(teamId) && game.teams.home.team.id !== Number(teamId)
    );

    schedule.dates[0].games = [...favoriteGames, ...otherGames];

    return schedule;
  }
}
