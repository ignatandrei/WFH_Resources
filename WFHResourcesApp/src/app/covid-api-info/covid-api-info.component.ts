import { Component, OnInit } from '@angular/core';
import { CovidDataService } from 'src/covid-data.service';
import { CovidData } from 'src/codvid';
import { CovidOverallStatus } from 'src/covidOverallStatus';
import * as moment from 'moment';

@Component({
  selector: 'app-covid-api-info',
  templateUrl: './covid-api-info.component.html',
  styleUrls: ['./covid-api-info.component.css']
})
export class CovidApiInfoComponent implements OnInit {

  public coronaData: CovidData;
  public coronaOverallStatusData: CovidOverallStatus;
  public coronaDate: string;

  constructor(    private covidDataService: CovidDataService) { }

  ngOnInit(): void {
    this.getCovidData();
    this.getCovidOverallStatus();

  }

  getCovidData() {
    this.covidDataService.getCovidData().subscribe(data => {
      // just see  the latest
      const last = data.length - 1;
      this.coronaData = data[last];

      this.coronaDate = moment(this.coronaData.Date).format(
        'MMMM Do YYYY, HH:mm'
      );
    });
  }
  getCovidOverallStatus() {
    this.covidDataService.getCovidStatusData().subscribe(data => {
      this.coronaOverallStatusData = data;
    });
  }
}
