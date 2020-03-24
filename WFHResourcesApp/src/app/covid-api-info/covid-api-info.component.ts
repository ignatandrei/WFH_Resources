import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CovidDataService } from 'src/covid-data.service';
import { CovidData } from 'src/codvid';
import { CovidOverallStatus } from 'src/covidOverallStatus';
import * as moment from 'moment';
import Chart from 'chart.js';
import { zip } from 'rxjs';
import { CountryCovid19 } from 'src/CountryCovid19';
@Component({
  selector: 'app-covid-api-info',
  templateUrl: './covid-api-info.component.html',
  styleUrls: ['./covid-api-info.component.css']
})
export class CovidApiInfoComponent implements OnInit , AfterViewInit {

  @ViewChild('chartCompare')
  public refChart: ElementRef;

  @ViewChild('chartBoth')
  public refChart1: ElementRef;


  public chartData: any;

  public chartData1: any;

  public coronaDataFirst: CovidData[];
  public coronaDataSecond: CovidData[];
  public coronaOverallStatusData: CovidOverallStatus;
  public coronaDate: string;
  private lineChart: Chart;
  private lineChart1: Chart;
  private lineChart2: Chart;
  public country1: CountryCovid19;
  public country2: CountryCovid19;
  public AllCountries1: CountryCovid19[];
  public AllCountries2: CountryCovid19[];
  constructor(    private covidDataService: CovidDataService) { }

  public ngOnInit() {
    this.covidDataService.getCovid19ApiCountries().subscribe(
      it => {
        this.AllCountries1 = it ;
        this.AllCountries2 =  it;
      }

    );

}
public changeSelection(nr: number, c: CountryCovid19) {
  this['country' + nr ] = c;
  if (this.country1 != null && this.country2 != null) {
    this.getCovidData(this.country1.Slug, this.country2.Slug);
  }
}
ngAfterViewInit(): void {
    this.getCovidData('romania', 'italy');
    this.getCovidOverallStatus();

  }

  getCovidData(first: string, second: string) {
    const obs1 = this.covidDataService.getCovidData(first);
    const obs2 = this.covidDataService.getCovidData(second);
    zip(obs1, obs2).subscribe( ([f , s ]) => {
      this.coronaDataFirst = f.filter(it => it.Cases > 0).sort((a, b) => a.Date.localeCompare(b.Date));
      this.coronaDataSecond = s.filter(it => it.Cases > 0).sort((a, b) => a.Date.localeCompare(b.Date));
      const min = Math.min(this.coronaDataFirst.length, this.coronaDataSecond.length);
      const max = Math.max(this.coronaDataFirst.length, this.coronaDataSecond.length);

      // window.alert(min);
      const data1 = this.coronaDataFirst.slice(0, min).map(it => it.Cases);
      const data2 = this.coronaDataSecond.slice(0, min).map(it => it.Cases);
      const maxValue1 = Math.max(...data1 ) ;
      const maxValue2 =  Math.max(...data2 ) ;
      const maxValue = Math.max(maxValue1, maxValue2) ;

      const dataFirst = {
        label: f[0].Country,
        data: this.coronaDataFirst.slice(0, min).map(it => it.Cases),
        lineTension: 0,
        fill: false,
        borderColor: 'red'
      };
      const dataSecond = {
        label: s[0].Country,
        data:  this.coronaDataSecond.slice(0, min).map(it => it.Cases),
        lineTension: 0,
        fill: false,
      borderColor: 'blue'
      };

      this.chartData = {
        labels: [...Array(min).keys()].map(it => {
            return this.coronaDataFirst[it].Country.slice(0, 2) + ':' + moment(this.coronaDataFirst[it].Date).format('MMM DD')
            + '-' +
            this.coronaDataSecond[it].Country.slice(0, 2) + ':' + moment(this.coronaDataSecond[it].Date).format('MMM DD')
            ;
          }
          ),
        datasets: [dataFirst, dataSecond]
      };
      const chart = this.refChart.nativeElement;
      const ctx = chart.getContext('2d');

      this.lineChart = new Chart(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.getChartOptions(maxValue, 'confirmed cases from the start - same number of days')
      });


      const dataFirst1 = {
        label: f[0].Country,
        data: this.coronaDataFirst.map(it => it.Cases),
        lineTension: 0,
        fill: false,
        borderColor: 'red'
      };
      const dataSecond1 = {
        label: s[0].Country,
        data:  this.coronaDataSecond.map(it => it.Cases),
        lineTension: 0,
        fill: false,
      borderColor: 'blue'
      };

      this.chartData1 = {
        labels: [...Array(max).keys()].map(it => {
          let first = '--';
          if (this.coronaDataFirst.length > it) {
            first =  this.coronaDataFirst[it].Country.slice(0, 2) + ':' + moment(this.coronaDataFirst[it].Date).format('MMM DD');
          }

          let second = '---';
          if (this.coronaDataSecond.length > it) {
            second = this.coronaDataSecond[it].Country[0].slice(0, 2) + ':' + moment(this.coronaDataSecond[it].Date).format('MMM DD');
          }
          return first + '-' + second;
        }),

        datasets: [dataFirst1, dataSecond1]
      };

      const chart1 = this.refChart1.nativeElement;
      const ctx1 = chart1.getContext('2d');

      this.lineChart1 = new Chart(ctx1, {
        type: 'line',
        data: this.chartData1,
        options: this.getChartOptions(maxValue, 'confirmed cases : all days ')
      });


    });
  }
  getChartOptions(maxValueY: number, title: string): any {
    return {
      responsive: true,
      title: {
        display: true,
        text: title ,
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
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Number'
          },
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: maxValueY + 1
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Days'
          },
          ticks: {
            autoSkip: false
          }
        }]
      }
    };

  }
  getCovidOverallStatus() {
    this.covidDataService.getCovidStatusData().subscribe(data => {
      this.coronaOverallStatusData = data;
    });
  }
}
