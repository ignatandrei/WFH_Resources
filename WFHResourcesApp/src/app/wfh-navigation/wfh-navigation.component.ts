import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadDataService } from '../load-data.service';

@Component({
  selector: 'app-wfh-navigation',
  templateUrl: './wfh-navigation.component.html',
  styleUrls: ['./wfh-navigation.component.css']
})
export class WfhNavigationComponent implements OnInit {

  public Dates: Date[];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private Cat: LoadDataService) {}
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.Cat.Category$.subscribe(it => this.Dates = it.Dates());
  }

}
