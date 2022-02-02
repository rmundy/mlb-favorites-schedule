import { IsInt, IsString } from 'class-validator';

export class ScheduleDto {
  @IsString()
  copyright: string;

  @IsInt()
  totalItems: number;

  @IsInt()
  totalEvents: number;

  @IsInt()
  totalGames: number;

  @IsInt()
  totalGamesInProgress: number;

  dates: [];
}
