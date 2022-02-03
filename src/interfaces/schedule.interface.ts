import { Date } from './date.interface';

export interface Schedule {
    copyright: string;
    totalItems: number;
    totalEvents: number;
    totalGames: number;
    totalGamesInProgress: number;
    dates: Date[];
}
