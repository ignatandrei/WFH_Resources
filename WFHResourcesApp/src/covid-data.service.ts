import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CovidData } from "./codvid";
import { Observable, of } from "rxjs";
import { CovidOverallStatus } from "./covidOverallStatus";
import { CountryCovid19 } from "./CountryCovid19";
import { map, pluck } from "rxjs/operators";
import * as data from "./assets/allData";
import { JH } from "./jh";
import { Ip2Country } from "./Ip2Country";

@Injectable({
  providedIn: "root",
})
export class CovidDataService {
  covidApi = "https://api.covid19api.com/";
  covidStatusApi = "https://api.thevirustracker.com/free-api?global=stats";
  private mp: JH[];
  private dataCountry: CountryCovid19[];

  constructor(private http: HttpClient) {
    const myMap = new Map<string, JH[]>(data.a);
    myMap.forEach((value: JH[], key: string) => {
      value.forEach((it) => (it.Last_Update = key));
    });
    const all = Array.from(myMap.values());
    this.mp = ([] as JH[]).concat(...all);

    this.dataCountry = this.findCountries();
  }
  public findMyCountry(): Observable<Ip2Country> {
    return this.http.get<Ip2Country>("http://ip-api.com/json");
  }
  private findCountries(): CountryCovid19[] {
    const arr = Array.from(new Set(this.mp.map((it) => it.Country_Region)));
    const dataCountry = arr.map((it) => {
      const n = new CountryCovid19();
      n.Country = it;
      n.Slug = it;
      return n;
    });
    return dataCountry.sort((a, b) => a.Country.localeCompare(b.Country));
  }
  getCovid19ApiCountries(): Observable<CountryCovid19[]> {
    // data = data.sort((a,b));
    return of(this.dataCountry);
    // const url = this.covidApi + `countries`;
    // return this.http.get<CountryCovid19[]>(url);
  }
  getCovidData(
    country: string,
    status: string
  ): Observable<[string, CovidData[]]> {
    const dataCountry = this.mp.filter((it) => it.Country_Region === country);
    const ret = dataCountry.map((it) => {
      const n = new CovidData();
      n.Country = it.Country_Region;
      n.Date =
        it.Last_Update.substr(0, 4) +
        "-" +
        it.Last_Update.substr(4, 2) +
        "-" +
        it.Last_Update.substr(6, 2);
      // console.log(it.Last_Update + ' ==' + n.Date);
      n.Status = status;
      n.Province = "";
      switch (status.toLowerCase()) {
        case "confirmed":
          n.Cases = it.Confirmed;
          break;
        case "deaths":
          n.Cases = it.Deaths;
          break;
        case "recovered":
          n.Cases = it.Recovered;
          break;
        default:
          // console.log(`not found ${status}`);
          throw status;
      }
      return n;
    });
    // window.alert(`${country} ${ret.length}`);
    // console.log(ret.find(it=>it.Country==="France" && it.Cases===40174));
    return of([country, ret]);
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
