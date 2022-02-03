import { IsInt, IsString, validate } from 'class-validator';
import { Date } from 'src/interfaces/date.interface';

export class ScheduleDto {
  @IsInt()
  copyright: string;

  @IsInt()
  totalItems: number;

  @IsInt()
  totalEvents: number;

  @IsInt()
  totalGames: number;

  @IsInt()
  totalGamesInProgress: number;

  dates: Date[];
}
