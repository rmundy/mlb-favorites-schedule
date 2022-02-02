import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class SchedulesService {
    constructor(private httpService: HttpService) { }
    getSchedule(date: string, sportId: string, language: string): Observable<AxiosResponse> {
        return this.httpService.get(`https://statsapi.mlb.com/api/v1/schedule?date=${date}&sportId=${sportId}&language=${language}`);
    }
}
