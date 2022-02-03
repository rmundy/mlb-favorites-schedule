import { LeagueRecord } from './league-record.interface';
import { Team } from './team.interface';

export interface Away {
    leagueRecord: LeagueRecord;
    score: number;
    team: Team;
    isWinner: boolean;
    splitSquad: boolean;
    seriesNumber: 2
}
