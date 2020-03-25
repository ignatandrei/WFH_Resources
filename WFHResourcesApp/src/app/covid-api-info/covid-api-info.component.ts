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
import { zip, Observable } from 'rxjs';
import { CountryCovid19 } from 'src/CountryCovid19';
import { JsonPipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { shareReplay, map } from 'rxjs/operators';
import * as introJs from 'intro.js/intro.js';
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

  private colors: string[] = ['red', 'blue', 'black', 'orange', 'green'];
  public AllCorona: Array<CovidData[]>;
  public coronaOverallStatusData: CovidOverallStatus = new CovidOverallStatus();
  public coronaDate: string;
  private lineChart: Chart;
  private lineChart1: Chart;
  public countrySelected: CountryCovid19[];
  public AllCountries: Array<CountryCovid19[]>;
  private countries: CountryCovid19[];
  private countriesFromQuery: string[] = [];
  public currentLink: string;
  public status = ['confirmed', 'recovered', 'deaths'];
  public statusSelected = 'confirmed';
  public introJS: any;
  constructor(
    private covidDataService: CovidDataService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver

  ) {
    this.countrySelected = [];
    this.AllCountries = [];
    this.route.paramMap.subscribe(it => {
      if (it.has('id?')) {
        const data = it.get('id?')?.trim();
        if (data && data.length > 0) {
        this.countriesFromQuery = data.split('-');
        }
      }
    });
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  changeStatus(s: string) {
    this.statusSelected = s;
    // window.alert(this.statusSelected);
    this.getCovidDataAll(this.countrySelected.map(it => it?.Slug));

  }
  removeCountry(i: number) {
    this.countrySelected.splice(i, 1);
    this.getCovidDataAll(this.countrySelected.map(it => it?.Slug));

    this.currentLink = this.generateURL();
  }
  private generateURL() {

    // const url = this.router.url;
    const url = this.route.routeConfig.path;
    const path =  this.countrySelected.filter(it => it != null).map(it => it.Country).join('-');
    const baseRoot = document.getElementsByTagName('base')[0].href;

    return baseRoot +  url.replace(':id?', path) ;
  }
  canAdd(): boolean {
    return this.countrySelected.length < this.colors.length;
  }
  addCountry(c: CountryCovid19) {
    // window.alert('add '+c?.Country);
    if (c != null) {
      if (this.countrySelected.filter(it => it.Country === c.Country).length > 0) {
        return;
      }
    }
    this.AllCountries.push(this.countries);
    this.countrySelected.push(c);
    this.currentLink = this.generateURL();
  }
  public ngOnInit() {


    // window.alert('asd');
    this.covidDataService.getCovid19ApiCountries().subscribe(val => {
      const it = [...val];
      this.countries = it.filter(x => x?.Country?.length > 0);
      // window.alert(this.countriesFromQuery.length);
      if (this.countriesFromQuery.length > 0) {
        const fromQuery = it.filter(
          a =>
            this.countriesFromQuery.filter(
              c => c?.toLowerCase() === a?.Country?.toLowerCase()
            ).length > 0
        );

        for (const f of fromQuery) {
          if (this.canAdd()) {
            // window.alert(this.countriesFromQuery.length );
            this.addCountry(f);
          }
        }
      }
      if (this.countrySelected.length === 0) {
        // window.alert(1);
        this.addCountry(null);
        // window.alert(2);
        this.addCountry(null);
        // window.alert(3);
      }
      // this.addCountry(it.find(c => c.Country === 'Austria'));
      // this.addCountry(it.find(c => c.Country === 'Germany'));

      // this.addCountry(it[10]);
      // this.addCountry(it[68]);
    });
  }
  public changeSelection(nr: number, c: CountryCovid19) {
    this.countrySelected[nr] = c;
    this.getCovidDataAll(this.countrySelected.map(it => it?.Slug));
    this.currentLink = this.generateURL();
  }
  ngAfterViewInit(): void {
    this.getCovidDataAll(this.countrySelected.map(c => c?.Slug));
    // this.getCovidData('romania', 'italy');
    this.getCovidOverallStatus();
    this.introJS = introJs();
    this.introJS.setOptions({
      steps: [
      {
         element: '#wfh',
         intro: 'Welcome to the covid tracker!',
         position: 'right'
      },
      {
        element: '#allCountries',
        intro: 'You can choose one country',
        position: 'right'
      },

      {
        element: '#addCountry',
        intro: 'or add more countries',
        position: 'right'
      },
      {
         element: '#status',
         intro: 'Here you can change the status',
         position: 'right'
      },
      {
        element: '#copyLink',
        intro: 'here you can see the current selected countries to can forward it'
      }
   ],
   showProgress: true
  }).start();

  }

  getCovidDataAll(slugs: string[]) {
    if (!slugs.every(it => it?.length > 0)) {
      return;
    }
    // const obs1 = this.covidDataService.getCovidData(slugs[0]);
    // const obs2 = this.covidDataService.getCovidData(slugs[1]);
    this.AllCorona = [];
    const obs = slugs.map(it => this.covidDataService.getCovidData(it, this.statusSelected));
    zip(...obs).subscribe(arr => {
      this.AllCorona = [];
      for (let i = 0; i < arr.length; i++) {
        const item =  arr[i];
        const country = item[0];
        const f = item[1];
        const f1 = (
          f.filter(it => (it.Cases > 0 ) && (it.Province === ''))
            .sort((a, b) => a.Date.localeCompare(b.Date))
        );
        const arrDel = [];
        for (let j = 0; j < f1.length - 1; j++) {
          f1[j].RealDate = moment(f1[j].Date).toDate();
          f1[j + 1].RealDate = moment(f1[j + 1].Date).toDate();
          const diffTime = Math.abs(f1[j + 1].RealDate.setHours(0, 0, 0, 0) - f1[j ].RealDate.setHours(0, 0, 0, 0) );
          const diffDays = (diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 1) {
            console.log('gap' + diffDays);
            console.log(f1[j]);
            console.log(f1[j + 1]);
          }
          if (diffDays < 1) {
            console.log('duplicate date');
            console.log(f1[j]);
            console.log(f1[j + 1]);

            arrDel.push(f1[j]);
          }

        }
        arrDel.forEach(it => f1.splice(f1.indexOf(it), 1));
        this.AllCorona.push(f1);

      }


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
          `${this.statusSelected} cases from the day 0 to day :${min} `
        )
      });

      const dataForChart: Array<any> = [];

      for (let data = 0; data < this.AllCorona.length; data++) {
        const dataValue = this.AllCorona[data];
        const dataFirst = {
          label: dataValue[0].Country + `(${dataValue.length} days)`,
          data: dataValue.map(it => it.Cases),
          lineTension: 0,
          fill: false,
          borderColor: this.colors[data]
        };
        dataForChart.push(dataFirst);
      }

      this.chartData1 = {
        labels: [...Array(max).keys()].map(it => `day ${it}`),

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
          `${this.statusSelected} cases : day 0 to ${max}`
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
      for (const f of data.results) {
      this.coronaOverallStatusData.results.push(f);
      };
    });
  }
}
