import { Component, OnInit } from '@angular/core';
import { CovidDataService } from 'src/covid-data.service';
import { CountryCovid19 } from 'src/CountryCovid19';
import { tap, switchMap, concatMap, mergeMap, map } from 'rxjs/operators';
import { CovidData } from 'src/codvid';
import { country } from 'src/countryList';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-covid-table-data',
  templateUrl: './covid-table-data.component.html',
  styleUrls: ['./covid-table-data.component.css']
})
export class CovidTableDataComponent implements OnInit {

  public Countries: CountryCovid19[] = [];
  public displayData = new  Map<string , CovidData[]>();
  public lastItems :  CovidData[] = [];
  public status = [
    'confirmed',
    'recovered',
    'deaths'
  ];
  public statusSelected = 'confirmed';
  constructor(    private covidDataService: CovidDataService) { }
  changeStatus(s: string) {
    this.statusSelected = s;
    window.alert(this.statusSelected);
    this.reloadData();
    window.alert(this.statusSelected);
    // window.alert(this.statusSelected);
    //this.getCovidDataAll(this.countrySelected.map((it) => it?.Slug));
  }
  reloadData(){
    this.lastItems.length=0;
    this.covidDataService.getCovid19ApiCountries()
    .pipe(
      tap(it=>this.Countries=it),
      map(res => res.map(cnt => this.covidDataService.getCovidData(cnt.Country, this.statusSelected))),
      mergeMap(it=> forkJoin(it)),
      tap(dict=> {
        
        for (let i = 0; i < dict.length; i++) {
          const item = dict[i];
          
          this.displayData.set(item[0] , item[1]);
          var last=item[1][0];
          this.lastItems.push(last);
        }
        this.lastItems  = this.lastItems.sort((a,b)=>  b.Cases - a.Cases);
        // window.alert(this.displayData.size);
      })
    )
    .subscribe();
  }
  ngOnInit(): void {
    this.reloadData();
  }

}
