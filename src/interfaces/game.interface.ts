import { Status } from './status.interface';
import { Teams } from './teams.interface';

export interface Game {
  gamePk: number;
  link: string;
  gameType: string;
  season: string;
  gameDate: string;
  officialDate: string;
  status: Status;
  teams: Teams;
}
