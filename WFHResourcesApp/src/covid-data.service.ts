import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CovidData } from "./codvid";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CovidDataService {
  covidApi = "https://api.covid19api.com/country/romania/status/confirmed/live";
  constructor(private http: HttpClient) {}

  getCovidData(): Observable<CovidData[]> {
    return this.http.get<CovidData[]>(this.covidApi);
  }
}
