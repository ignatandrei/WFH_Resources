import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidData } from './codvid';
import { Observable } from 'rxjs';
import { CovidOverallStatus } from './covidOverallStatus';
import { CountryCovid19 } from './CountryCovid19';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  covidApi = 'https://api.covid19api.com/';
  covidStatusApi = 'https://thevirustracker.com/free-api?global=stats';
  constructor(private http: HttpClient) {}

  getCovid19ApiCountries(): Observable<CountryCovid19[]> {
    const url = this.covidApi + `countries`;
    return this.http.get<CountryCovid19[]>(url);
  }
  getCovidData(country: string): Observable<CovidData[]> {
    const url = this.covidApi + `country/${country}/status/confirmed/live`;
    return this.http.get<CovidData[]>(url)
    .pipe(
      map(t => [...t.map(it=>new CovidData(it))])
    )
  }
  getCovidStatusData(): Observable<CovidOverallStatus> {
    return this.http.get<CovidOverallStatus>(this.covidStatusApi);
  }
}
