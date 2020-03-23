import { Component, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { LoadDataService } from "../load-data.service";
import * as moment from "moment";
import { CovidDataService } from "src/covid-data.service";
import { CovidData } from "src/codvid";

@Component({
  selector: "app-wfh-navigation",
  templateUrl: "./wfh-navigation.component.html",
  styleUrls: ["./wfh-navigation.component.css"]
})
export class WfhNavigationComponent implements OnInit {
  public isCategoriesCollapsed = true;
  public isSubCategoriesCollapsed = true;
  public Dates: moment.Moment[];
  public coronaData: CovidData;
  public coronaDate: string;
  public Categories: Map<string, string[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private Cat: LoadDataService,
    private covidDataService: CovidDataService
  ) {}
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.Cat.Category$.subscribe(it => {
      this.Dates = it.Dates();
      this.Categories = it.Categories();
    });
    this.getCovidData();
  }
  getCovidData() {
    this.covidDataService.getCovidData().subscribe(data => {
      //just see  the latest
      const last = data.length-1;
      this.coronaData=data[last];
      
    });
  }
}
