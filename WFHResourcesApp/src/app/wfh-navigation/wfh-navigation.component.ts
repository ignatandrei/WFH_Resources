import { Component, OnInit, Input } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { LoadDataService } from "../load-data.service";
import * as moment from "moment";
import { CovidDataService } from "src/covid-data.service";
import { CovidData } from "src/codvid";
import { CovidOverallStatus } from "src/covidOverallStatus";
import { FormControl } from "@angular/forms";
import { NagivationTableControlService } from "src/nagivation-table-control.service";

@Component({
  selector: "app-wfh-navigation",
  templateUrl: "./wfh-navigation.component.html",
  styleUrls: ["./wfh-navigation.component.css"],
})
export class WfhNavigationComponent implements OnInit {
  @Input()
  formControl: string;
  public isCategoriesCollapsed = true;
  public isSubCategoriesCollapsed = true;
  public Dates: moment.Moment[];
  public Categories: Map<string, string[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  covidTickerData: CovidOverallStatus;
  public filterSource: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private Cat: LoadDataService,
    private covidDataService: CovidDataService,
    private navTableSource: NagivationTableControlService
  ) {}
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.Cat.Category$.subscribe((it) => {
      this.Dates = it.Dates();
      this.Categories = it.Categories();
    });
    this.getCovidTickerData();
    this.navTableSource.navTableObservable.subscribe(
      (filterSource) => (this.filterSource = filterSource)
    );
  }

  getCovidTickerData() {
    this.covidDataService.getCovidStatusData().subscribe((data) => {
      this.covidTickerData = data;
      console.log("test " + data);
    });
  }
}
