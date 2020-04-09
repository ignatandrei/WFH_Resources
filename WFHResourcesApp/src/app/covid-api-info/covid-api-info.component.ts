import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { CovidDataService } from "src/covid-data.service";
import { CovidData } from "src/codvid";
import { CovidOverallStatus } from "src/covidOverallStatus";
import * as moment from "moment";
import Chart from "chart.js";
import { zip, Observable } from "rxjs";
import { CountryCovid19 } from "src/CountryCovid19";
import { JsonPipe } from "@angular/common";
import { ThrowStmt } from "@angular/compiler";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { shareReplay, map } from "rxjs/operators";
import * as introJs from "intro.js/intro.js";
import * as CountryImport from "../../countryList";
import { notDeepEqual } from "assert";
@Component({
  selector: "app-covid-api-info",
  templateUrl: "./covid-api-info.component.html",
  styleUrls: ["./covid-api-info.component.css"],
})
export class CovidApiInfoComponent implements OnInit, AfterViewInit {
  @ViewChild("chartCompare")
  public refChart: ElementRef;

  @ViewChild("chartBoth")
  public refChart1: ElementRef;

  public chartData: any;

  public chartData1: any;

  private colors: string[] = ["red", "blue", "black", "orange", "green"];
  public AllCorona: Array<CovidData[]>;
  public coronaOverallStatusData: CovidOverallStatus;
  public coronaDate: string;
  private lineChart: Chart;
  private lineChart1: Chart;
  public countrySelected: CountryCovid19[];
  public AllCountries: Array<CountryCovid19[]>;
  private countries: CountryCovid19[];
  private countriesFromQuery: string[] = [];
  public currentLink: string;
  public status = [
    "confirmed",
    "recovered",
    "deaths",
    "% confirmed rate",
    "% recovered rate",
    "% deaths rate",
    "covid deaths vs 2017 deaths",
  ];
  public statusSelected = "confirmed";
  public introJS: any;
  private perPopulation = false;
  get PerPopulation(): boolean {
    return this.perPopulation;
  }
  set PerPopulation(val: boolean) {
    this.perPopulation = val;
    this.getCovidDataAll(this.countrySelected.map((it) => it?.Slug));
  }
  private startWith = 1;
  get StartWith(): number {
    return this.startWith;
  }
  set StartWith(val: number) {
    this.startWith = val;
    this.getCovidDataAll(this.countrySelected.map((it) => it?.Slug));
  }

  constructor(
    private covidDataService: CovidDataService,
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {
    this.countrySelected = [];
    this.AllCountries = [];
    this.route.paramMap.subscribe((it) => {
      if (it.has("id?")) {
        const data = it.get("id?")?.trim();
        if (data && data.length > 0) {
          this.countriesFromQuery = data.split("-");
        }
      }
    });
    const verticalLinePlugin = {
      getLinePosition(chart, pointIndex) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return data[pointIndex]._model.x;
      },
      getDta(chart, pointIndex) {
        const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
        const data = meta.data;
        return data;
      },
      renderVerticalLine(chartInstance, pointIndex) {
        const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
        const data1 = this.getDta(chartInstance, pointIndex);
        // window.alert(JSON.stringify(data1[pointIndex]._model)) ;
        const scale = chartInstance.scales["y-axis-0"];
        const context = chartInstance.chart.ctx;

        // render vertical line
        context.beginPath();
        context.strokeStyle = "#ff0000";
        context.moveTo(lineLeftOffset, scale.top);
        context.lineTo(lineLeftOffset, scale.bottom);
        context.stroke();

        // write label
        context.fillStyle = "#ff0000";
        context.textAlign = "center";
        context.fillText(
          "MY TEXT",
          lineLeftOffset,
          (scale.bottom - scale.top) / 2 + scale.top
        );
      },

      afterDatasetsDraw(chart, easing) {
        if (chart.config.lineAtIndex) {
          chart.config.lineAtIndex.forEach((pointIndex) =>
            this.renderVerticalLine(chart, pointIndex)
          );
        }
      },
    };

    Chart.plugins.register(verticalLinePlugin);
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  changeStatus(s: string) {
    this.statusSelected = s;
    // window.alert(this.statusSelected);
    this.getCovidDataAll(this.countrySelected.map((it) => it?.Slug));
  }
  removeCountry(i: number) {
    this.countrySelected.splice(i, 1);
    this.getCovidDataAll(this.countrySelected.map((it) => it?.Slug));

    this.currentLink = this.generateURL();
  }
  private generateURL() {
    // const url = this.router.url;
    const url = this.route.routeConfig.path;
    const path = this.countrySelected
      .filter((it) => it != null)
      .map((it) => it.Country)
      .join("-");
    const baseRoot = document.getElementsByTagName("base")[0].href;
    const lnk = baseRoot + url.replace(":id?", path);
    window.history.pushState(lnk, path, lnk);
    return lnk;
  }
  canAdd(): boolean {
    return this.countrySelected.length < this.colors.length;
  }
  addCountry(c: CountryCovid19) {
    // window.alert('add '+c?.Country);
    if (c != null) {
      if (
        this.countrySelected.filter((it) => it.Country === c.Country).length > 0
      ) {
        return;
      }
    }
    this.AllCountries.push(this.countries);
    this.countrySelected.push(c);
    this.currentLink = this.generateURL();
    this.getCovidDataAll(this.countrySelected.map((it) => it?.Slug));
  }
  public ngOnInit() {
    // window.alert('asd');
    this.covidDataService.getCovid19ApiCountries().subscribe((val) => {
      const it = [...val];
      this.countries = it.filter((x) => x?.Country?.length > 0);
      // window.alert(this.countriesFromQuery.length);
      if (this.countriesFromQuery.length > 0) {
        const fromQuery = it.filter(
          (a) =>
            this.countriesFromQuery.filter(
              (c) => c?.toLowerCase() === a?.Country?.toLowerCase()
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
        // this.addCountry(null);
        // window.alert(2);
        this.covidDataService.findMyCountry().subscribe((ds) => {
          let countryFind = this.countries.find(
            (c) => c.Country.toLowerCase() === ds.country.toLowerCase()
          );
          if (countryFind == null) {
            const cc = CountryImport.Countries.find(
              (c) => c.countryCode === ds.countryCode
            );
            if (cc != null) {
              countryFind = this.countries.find(
                (c) => c.Country.toLowerCase() === cc.name.toLowerCase()
              );
            }
          }
          if (countryFind != null) {
            this.addCountry(countryFind);
            this.addCountry(null);
          }
        });
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
    this.getCovidDataAll(this.countrySelected.map((it) => it?.Slug));
    this.currentLink = this.generateURL();
  }
  ngAfterViewInit(): void {
    this.getCovidDataAll(this.countrySelected.map((c) => c?.Slug));
    // this.getCovidData('romania', 'italy');
    this.getCovidOverallStatus();
    this.introJS = introJs();
    this.introJS
      .setOptions({
        steps: [
          {
            element: "#wfh",
            intro: "Welcome to the covid tracker!",
            position: "right",
          },
          {
            element: "#allCountries",
            intro: "You can choose one country",
            position: "right",
          },

          {
            element: "#addCountry",
            intro: "or add more countries",
            position: "right",
          },
          {
            element: "#status",
            intro: "Here you can change the status",
            position: "right",
          },
          {
            element: "#copyLink",
            intro:
              "here you can see the current selected countries to can forward it",
          },
        ],
        showProgress: true,
      })
      .start();
  }
  getDataFromStatus(stat: string): string {
    switch (stat) {
      case "covid deaths vs 2017 deaths":
        return "deaths";
      case "% confirmed rate":
        return "confirmed";

      case "% deaths rate":
        return "deaths";

      case "% recovered rate":
        return "recovered";
    }
    return stat;
  }
  getCovidDataAll(slugs: string[]) {
    if (!slugs.every((it) => it?.length > 0)) {
      return;
    }
    // const obs1 = this.covidDataService.getCovidData(slugs[0]);
    // const obs2 = this.covidDataService.getCovidData(slugs[1]);
    this.AllCorona = [];
    const obs = slugs.map((it) =>
      this.covidDataService.getCovidData(
        it,
        this.getDataFromStatus(this.statusSelected)
      )
    );
    zip(...obs).subscribe((arr) => {
      this.AllCorona = [];
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        const country = item[0];
        const f = item[1];
        if (this.perPopulation) {
          console.log(`trying to find ${country}`);
          const c = CountryImport.Countries.find((it) => it.name === country);
          f.forEach(
            (val) => (val.Cases = (val.Cases * 100000) / c.population2020)
          );
        }
        const f1 = f
          .filter((it) => it.Cases > 0 && it.Province === "")
          .sort((a, b) => a.Date.localeCompare(b.Date));

        // window.alert(`${f.length} --- ${f1.length}`);
        if (f1.length === 0) {
          // only province -so I need to do the sum
          f.reduce((res, value) => {
            if (!res[value.Date]) {
              const newVal = new CovidData(value);
              newVal.Cases = 0;
              res[value.Date] = newVal;
              f1.push(res[value.Date]);
            }
            // console.log(value.Cases);
            res[value.Date].Cases += value.Cases;

            return res;
          }, {});
        }
        // console.log('before ' + f1.length, f1[0] , this.StartWith);
        while (f1.length > 0 && f1[0].Cases < this.StartWith) {
          f1.shift();
          // break;
        }
        // console.log('after' + f1.length , f1[0] , this.StartWith);
        if (this.statusSelected.indexOf("%") > -1) {
          for (let iF1 = f1.length - 1; iF1 > 0; iF1--) {
            const first = f1[iF1 - 1];
            const second = f1[iF1];
            second.Cases = ((second.Cases - first.Cases) / first.Cases) * 100;
          }
          f1.shift();
        }
        for (const itemF1 of f1) {
          itemF1.RealDate = moment(itemF1.Date).toDate();
        }

        // f1.length = f1.length - 1;
        // const arrDel = [];
        // for (let j = 0; j < f1.length - 1; j++) {
        //   f1[j].RealDate = moment(f1[j].Date).toDate();
        //   f1[j + 1].RealDate = moment(f1[j + 1].Date).toDate();
        //   const diffTime = Math.abs(f1[j + 1].RealDate.setHours(0, 0, 0, 0) - f1[j ].RealDate.setHours(0, 0, 0, 0) );
        //   const diffDays = (diffTime / (1000 * 60 * 60 * 24));
        //   if (diffDays > 1) {
        //     console.log('gap' + diffDays);
        //     console.log(f1[j]);
        //     console.log(f1[j + 1]);
        //   }
        //   if (diffDays < 1) {
        //     console.log('duplicate date');
        //     console.log(f1[j]);
        //     console.log(f1[j + 1]);

        //     arrDel.push(f1[j]);
        //   }

        // }
        // arrDel.forEach(it => f1.splice(f1.indexOf(it), 1));
        // window.alert(f1.length);
        this.AllCorona.push(f1);
      }

      const lengthsArray = this.AllCorona.map((it) => it.length);

      const min = Math.min(...lengthsArray);
      const max = Math.max(...lengthsArray);

      const slicedDataCases = this.AllCorona.map((it) =>
        it.slice(0, min).map((c) => c.Cases)
      );
      const maxminValues = slicedDataCases.map((it) => ({
        max: Math.max(...it),
        min: Math.min(...it),
      }));

      const maxValue = Math.max(...maxminValues.map((it) => it.max));
      const dataForChartFromDay0: Array<any> = [];
      for (let data = 0; data < this.AllCorona.length; data++) {
        const dataValue = this.AllCorona[data];
        if (dataValue.length === 0) {
          continue;
        }
        const dataFirst = {
          label: dataValue[0].Country,
          data: dataValue.slice(0, min).map((it) => it.Cases),
          lineTension: 0,
          fill: false,
          borderColor: this.colors[data],
          orig: dataValue.slice(0, min),
          order: 0,
        };
        dataForChartFromDay0.push(dataFirst);
        if (this.statusSelected === "covid deaths vs 2017 deaths") {
          const val0 = dataValue[0];
          const c0 = CountryImport.Countries.find(
            (it) => it.name === val0.Country
          );
          const deathsNumberDay0 =
            (c0.population2020 * c0.Dead2017Per1000) / 1000 / 365;

          const DataDeaths = {
            label: `Deaths ${dataValue[0].Country}`,
            data: [...Array(min).keys()].map((it) => it * deathsNumberDay0),
            orig: [...Array(min).keys()].map((it) => {
              const ret = new CovidData(dataValue[it]);
              ret.Country = `Total Deaths ${ret.Country}`;
              ret.RealDate = new Date(ret.RealDate);
              ret.RealDate = new Date(ret.RealDate.setFullYear(2017));
              ret.Cases = it * deathsNumberDay0;
              if (this.PerPopulation) {
                ret.Cases = ret.Cases / 100_000;
              }

              return ret;
            }),
            backgroundColor: this.colors[data],
            type: "bar",
            order: 1,
          };
          dataForChartFromDay0.push(DataDeaths);
        }
      }

      this.chartData = {
        labels: [...Array(min).keys()],
        // .map(it => {
        //   const all = this.AllCorona.map(
        //     data =>
        //       data[it].Country.slice(0, 2) +
        //       ':' +
        //       moment(data[it].Date).format('MM DD')
        //   );
        //   return all.join('-');
        // })
        datasets: dataForChartFromDay0,
      };
      if (this.lineChart) {
        this.lineChart.destroy();
      }

      const chart = this.refChart.nativeElement;
      const ctx = chart.getContext("2d");

      this.lineChart = new Chart(ctx, {
        type: "line",
        // lineAtIndex: [2,4,8],
        data: this.chartData,
        options: this.getChartOptions(
          maxValue,
          `${this.statusSelected} cases from the day 0 to day : ${min} `
        ),
      });

      const dataForChart: Array<any> = [];

      for (let data = 0; data < this.AllCorona.length; data++) {
        const dataValue = this.AllCorona[data];
        if (dataValue.length === 0) {
          continue;
        }
        const dataFirst = {
          label: dataValue[0].Country + `(${dataValue.length} days)`,
          data: dataValue.map((it) => it.Cases),
          lineTension: 0,
          fill: false,
          borderColor: this.colors[data],
          orig: dataValue,
        };
        dataForChart.push(dataFirst);
      }

      this.chartData1 = {
        labels: [...Array(max).keys()].map((it) => `day ${it}`),

        datasets: dataForChart,
      };
      if (this.lineChart1) {
        this.lineChart1.destroy();
      }
      const chart1 = this.refChart1.nativeElement;
      const ctx1 = chart1.getContext("2d");

      this.lineChart1 = new Chart(ctx1, {
        type: "line",
        data: this.chartData1,
        options: this.getChartOptions(
          maxValue,
          `${this.statusSelected} cases : day 0 to ${max}`
        ),
      });
    });
  }
  getChartOptions(maxValueY: number, title: string): any {
    return {
      responsive: true,
      title: {
        display: true,
        text: title,
      },
      tooltips: {
        backgroundColor: "rgba(192,192,192, 1)",
        callbacks: {
          labelTextColor: (tooltipItem, chart) => {
            return this.colors[tooltipItem.datasetIndex];
          },
          title(tooltipItem, data) {
            const dsIndex = tooltipItem[0].datasetIndex;
            const index = tooltipItem[0].index;
            // console.log(tooltipItem);
            // console.log(dsIndex);
            console.log(index);
            const orig = data.datasets[dsIndex].orig;

            const covid = orig[index] as CovidData;
            const country = covid.Country;
            let nrDisplay = covid.Cases;
            if (Math.ceil(nrDisplay) !== nrDisplay) {
              nrDisplay = +nrDisplay.toFixed(2);
            }
            const label = `${country}:${moment(covid.RealDate).format(
              "YYYY MMM DD"
            )}:cases ${nrDisplay}`;

            return label;
          },
          label(tooltipItem, data) {
            const label = [];
            const dsIndex = tooltipItem.datasetIndex;
            const index = tooltipItem.index;
            const max = data.datasets.length;
            for (let i = 0; i < max; i++) {
              const orig = data.datasets[i].orig;
              // console.log(orig);
              if (orig.length <= index) {
                continue;
              }
              const covid = orig[index] as CovidData;
              let country = covid.Country;
              if (i === tooltipItem.datasetIndex) {
                country = country.toUpperCase();
              }
              let nrDisplay = covid.Cases;
              if (Math.ceil(nrDisplay) !== nrDisplay) {
                nrDisplay = +nrDisplay.toFixed(2);
              }

              label.push(
                `${country}:${moment(covid.RealDate).format(
                  "YYYY MMM DD"
                )}:cases ${nrDisplay}`
              );
            }
            if (dsIndex !== 0) {
              const a = label[dsIndex];
              label[dsIndex] = label[0];
              label[0] = a;
            }

            // label += Math.round(tooltipItem.yLabel * 100) / 100;
            // label += JSON.stringify(tooltipItem);
            // console.log(data);
            while (label.length < max) {
              label.push("---");
            }
            return label;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 10,
          fontColor: "black",
        },
      },
      scaleShowValues: true,
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Number",
            },
            ticks: {
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: maxValueY + 1,
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Days",
            },
            ticks: {
              autoSkip: false,
            },
          },
        ],
      },
    };
  }
  getCovidOverallStatus() {
    this.covidDataService
      .getCovidStatusData()
      .subscribe((data) => (this.coronaOverallStatusData = data));
  }
}
