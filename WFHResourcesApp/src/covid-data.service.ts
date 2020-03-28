import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CovidData } from './codvid';
import { Observable, of } from 'rxjs';
import { CovidOverallStatus } from './covidOverallStatus';
import { CountryCovid19 } from './CountryCovid19';
import { map } from 'rxjs/operators';
import * as  data from './assets/all';
import { JH } from './jh';
@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  covidApi = 'https://api.covid19api.com/';
  covidStatusApi = 'https://thevirustracker.com/free-api?global=stats';
  private mp: JH[];
  constructor(private http: HttpClient) {
     const myMap = new Map<string, JH[]>(data.a);
     myMap.forEach((value: JH[], key: string) => {
      value.forEach(it => it.Last_Update = key);
  });
     const all = Array.from(myMap.values());
     this.mp = ([] as JH[]).concat(...all);
      // window.alert(mp.size);
  }

  getCovid19ApiCountries(): Observable<CountryCovid19[]> {
    const arr = Array.from( new Set(this.mp.map(it => it.Country_Region)));
    let data = arr.map(it => {
      const n = new CountryCovid19();
      n.Country = it;
      n.Slug = it;
      return n;
    });
    //data = data.sort((a,b));
    return of(data);
    // const url = this.covidApi + `countries`;
    // return this.http.get<CountryCovid19[]>(url);
  }
  getCovidData(country: string, status: string): Observable<[string, CovidData[]]> {
    const data = this.mp.filter(it => it.Country_Region === country);
    let ret= data.map(it => {

      const n = new CovidData();
      n.Country = it.Country_Region;
      n.Date = it.Last_Update.substr(0, 4) + '-' + it.Last_Update.substr(4, 2)  + '-' + it.Last_Update.substr(6, 2);
      console.log(it.Last_Update +" ==" +n.Date);
      n.Status = status;
      n.Province = '';
      switch (status.toLowerCase()) {
        case 'confirmed':
          n.Cases = it.Confirmed;
          break;
        case 'deaths':
          n.Cases = it.Deaths;
          break;
        case 'active':
            n.Cases = it.Active;
            break;
        default:
            //console.log(`not found ${status}`);
            throw status;

      }
      return n;

    });
    // window.alert(`${country} ${ret.length}`);
    return of([status,ret]);
    // const url = this.covidApi + `dayone/country/${country}/status/${status}/live`;
    // return this.http.get<CovidData[]>(url)
    // .pipe(
    //   map(t => [country, [...t.map(it => new CovidData(it))]])
    // );
  }
  getCovidStatusData(): Observable<CovidOverallStatus> {
     return this.http.get<CovidOverallStatus>(this.covidStatusApi);
  }
}
