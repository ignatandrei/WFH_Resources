import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { Category } from './table-wfh/Category';
import { allData} from '../app/table-wfh/data'
import { Categories } from './table-wfh/Categories';
@Injectable({
  providedIn: 'root'
})
export class LoadDataService {

  public s: ReplaySubject<Categories>;
  public Category$: Observable< Categories>;
  
  constructor() {
    this.s = new ReplaySubject<Categories>();
    this.s.next(new Categories(allData));
    this.Category$ = this.s.asObservable();
  }

}
