import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CovidData } from "./codvid";
import { Observable } from "rxjs";
import { CovidOverallStatus } from "./covidOverallStatus";

@Injectable({
  providedIn: "root"
})
export class CovidDataService {
  covidApi = "https://api.covid19api.com/country/0/status/confirmed/live";
  covidStatusApi = "https://thevirustracker.com/free-api?global=stats";
  constructor(private http: HttpClient) {}

  getCovidData(country: string): Observable<CovidData[]> {
    var url = this.covidApi.replace('0', country);
    return this.http.get<CovidData[]>(url);
  }
  getCovidStatusData(): Observable<CovidOverallStatus> {
    return this.http.get<CovidOverallStatus>(this.covidStatusApi);
  }
}
