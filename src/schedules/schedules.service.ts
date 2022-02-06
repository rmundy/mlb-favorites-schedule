import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
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

  reSort(schedule: Schedule, teamId: string): Schedule {
    if (!schedule || !teamId || schedule.totalGames < 1) {
      return schedule;
    }

    const games = schedule.dates[0].games;
    const favoriteGames = games
      .filter(
        (game: Game) =>
          game.teams.away.team.id === Number(teamId) ||
          game.teams.home.team.id === Number(teamId)
      )
      .sort((game1, game2) => this.customSort(game1, game2));
    const otherGames = games
      .filter(
        (game: Game) =>
          game.teams.away.team.id !== Number(teamId) &&
          game.teams.home.team.id !== Number(teamId)
      )
      .sort((game1, game2) => this.customSort(game1, game2));

    schedule.dates[0].games = [...favoriteGames, ...otherGames];

    return schedule;
  }

  customSort(game1: Game, game2: Game): number {
    if (
      game1.doubleHeader === 'Y' &&
      game2.doubleHeader === 'Y' &&
      game1.teams.home.team.id === game2.teams.home.team.id &&
      game1.teams.away.team.id === game2.teams.away.team.id
    ) {
      if (game1.status.startTimeTBD === false) {
        return this.firstGameInProgress(game1)
          ? 0
          : this.secondGameInProgress
          ? 1
          : 0;
      } else {
        return this.firstGameInProgress(game2)
          ? 1
          : this.secondGameInProgress
          ? 0
          : 1;
      }
    } else {
      return (
        new Date(game1.gameDate).getTime() - new Date(game2.gameDate).getTime()
      );
    }
  }

  private firstGameInProgress(game: Game) {
    const today = new Date();
    return (
      game.status.startTimeTBD === false &&
      new Date(game.gameDate).getTime() < today.getTime() &&
      game.status.statusCode !== 'F'
    );
  }

  private secondGameInProgress(game: Game): boolean {
    return (
      game.status.startTimeTBD === true &&
      game.status.statusCode !== 'F'
    );
  }
}
