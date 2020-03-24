import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CovidDataService } from 'src/covid-data.service';
import { CovidData } from 'src/codvid';
import { CovidOverallStatus } from 'src/covidOverallStatus';
import * as moment from 'moment';
import Chart from 'chart.js';
import { zip } from 'rxjs';
import { CountryCovid19 } from 'src/CountryCovid19';
import { JsonPipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-covid-api-info',
  templateUrl: './covid-api-info.component.html',
  styleUrls: ['./covid-api-info.component.css']
})
export class CovidApiInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCompare')
  public refChart: ElementRef;

  @ViewChild('chartBoth')
  public refChart1: ElementRef;

  public chartData: any;

  public chartData1: any;

  public coronaDataFirst: CovidData[];
  public coronaDataSecond: CovidData[];
  private colors: string[] = ['red', 'blue', 'black', 'yellow', 'green'];
  public AllCorona: Array<CovidData[]>;
  public coronaOverallStatusData: CovidOverallStatus;
  public coronaDate: string;
  private lineChart: Chart;
  private lineChart1: Chart;
  private lineChart2: Chart;
  public countrySelected: CountryCovid19[];
  public AllCountries: Array<CountryCovid19[]>;
  private countries: CountryCovid19[];
  private countriesFromQuery: string[];
  private currentLink: string;
  constructor(
    private covidDataService: CovidDataService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.countrySelected = [];
    this.AllCountries = [];
    this.route.paramMap.subscribe(it => {
      if (it.has('id?')) {
        this.countriesFromQuery = it
          .get('id?')
          .toString()
          .split('-');
      }
    });
  }

  removeCountry(i: number) {
    this.countrySelected.splice(i, 1);
    this.getCovidData(this.countrySelected.map(it => it.Slug));
    this.currentLink = this.generateURL();
  }
  private generateURL() {

    // const url = this.router.url;
    const url = this.route.routeConfig.path;
    const path =  this.countrySelected.filter(it => it != null).map(it => it.Country).join('-');
    return '/' + url.replace(':id?', path) ;
  }
  canAdd(): boolean {
    return this.countrySelected.length < this.colors.length;
  }
  addCountry(c: CountryCovid19) {
    this.AllCountries.push(this.countries);
    this.countrySelected.push(c);
    this.currentLink = this.generateURL();
  }
  public ngOnInit() {
    this.covidDataService.getCovid19ApiCountries().subscribe(it => {
      this.countries = it;
      // window.alert(this.countriesFromQuery.length);
      if (this.countriesFromQuery.length > 0) {
        const fromQuery = it.filter(
          a =>
            this.countriesFromQuery.filter(
              c => c.toLowerCase() === a.Country.toLowerCase()
            ).length > 0
        );

        for (const f of fromQuery) {
          if (this.canAdd()) {
              this.addCountry(f);
          }
        }
      }
      if (this.countrySelected.length == 0) {
        this.addCountry(null);
      }
      // this.addCountry(it.find(c => c.Country === 'Austria'));
      // this.addCountry(it.find(c => c.Country === 'Germany'));

      // this.addCountry(it[10]);
      // this.addCountry(it[68]);
      this.getCovidData(this.countrySelected.map(c => c.Slug));
    });
  }
  public changeSelection(nr: number, c: CountryCovid19) {
    this.countrySelected[nr] = c;
    this.getCovidData(this.countrySelected.map(it => it.Slug));
    this.currentLink = this.generateURL();
  }
  ngAfterViewInit(): void {
    // this.getCovidData('romania', 'italy');
    this.getCovidOverallStatus();
  }

  getCovidData(slugs: string[]) {
    if (!slugs.every(it => it != null)) {
      return;
    }
    // const obs1 = this.covidDataService.getCovidData(slugs[0]);
    // const obs2 = this.covidDataService.getCovidData(slugs[1]);
    this.AllCorona = [];
    const obs = slugs.map(it => this.covidDataService.getCovidData(it));
    const obs1 = obs[0];
    const obs2 = obs[1];
    zip(...obs).subscribe(arr => {
      for (let i = 0; i < arr.length; i++) {
        const f = arr[i];
        this.AllCorona.push(
          f
            .filter(it => (it.Cases > 0 ) && (it.Province === ''))
            .sort((a, b) => a.Date.localeCompare(b.Date))
        );
      }

      this.coronaDataFirst = this.AllCorona[0];
      this.coronaDataSecond = this.AllCorona[1];

      const lengthsArray = this.AllCorona.map(it => it.length);

      const min = Math.min(...lengthsArray);
      const max = Math.max(...lengthsArray);

      const slicedDataCases = this.AllCorona.map(it =>
        it.slice(0, min).map(c => c.Cases)
      );
      const maxminValues = slicedDataCases.map(it => ({
        max: Math.max(...it),
        min: Math.min(...it)
      }));

      const maxValue = Math.max(...maxminValues.map(it => it.max));
      const dataForChartFromDay0: Array<any> = [];
      for (let data = 0; data < this.AllCorona.length; data++) {
        const dataValue = this.AllCorona[data];
        const dataFirst = {
          label: dataValue[0].Country,
          data: dataValue.slice(0, min).map(it => it.Cases),
          lineTension: 0,
          fill: false,
          borderColor: this.colors[data]
        };
        dataForChartFromDay0.push(dataFirst);
      }

      this.chartData = {
        labels: [...Array(min).keys()].map(it => {
          const all = this.AllCorona.map(
            data =>
              data[it].Country.slice(0, 2) +
              ':' +
              moment(data[it].Date).format('MM DD')
          );
          return all.join('-');
        }),
        datasets: dataForChartFromDay0
      };
      if (this.lineChart) {
        this.lineChart.destroy();
      }

      const chart = this.refChart.nativeElement;
      const ctx = chart.getContext('2d');

      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.getChartOptions(
          maxValue,
          `confirmed cases from the day 0 to day :${min} `
        )
      });

      const dataForChart: Array<any> = [];

      for (let data = 0; data < this.AllCorona.length; data++) {
        const dataValue = this.AllCorona[data];
        const dataFirst = {
          label: dataValue[0].Country,
          data: dataValue.map(it => it.Cases),
          lineTension: 0,
          fill: false,
          borderColor: this.colors[data]
        };
        dataForChart.push(dataFirst);
      }

      this.chartData1 = {
        labels: [...Array(max).keys()],

        datasets: dataForChart
      };
      if (this.lineChart1) {
        this.lineChart1.destroy();
      }
      const chart1 = this.refChart1.nativeElement;
      const ctx1 = chart1.getContext('2d');

      this.lineChart1 = new Chart(ctx1, {
        type: 'line',
        data: this.chartData1,
        options: this.getChartOptions(
          maxValue,
          `confirmed cases : day 0 to ${max}`
        )
      });
    });
  }
  getChartOptions(maxValueY: number, title: string): any {
    return {
      responsive: true,
      title: {
        display: true,
        text: title
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 10,
          fontColor: 'black'
        }
      },
      scaleShowValues: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Number'
            },
            ticks: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: maxValueY + 1
            }
          }
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Days'
            },
            ticks: {
              autoSkip: false
            }
          }
        ]
      }
    };
  }
  getCovidOverallStatus() {
    this.covidDataService.getCovidStatusData().subscribe(data => {
      this.coronaOverallStatusData = data;
    });
  }
}
