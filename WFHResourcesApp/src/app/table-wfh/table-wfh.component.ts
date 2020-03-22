import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { Category } from './Category';
import { allData } from './data';
import { LoadDataService } from '../load-data.service';
import { ThrowStmt } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { FilterData } from './filterData';
@Component({
  selector: 'app-table-wfh',
  templateUrl: './table-wfh.component.html',
  styleUrls: ['./table-wfh.component.css'],
  providers: []
})
export class TableWFHComponent implements OnInit {
  category: Category[];
  categories$: Observable<Category[]>;
  filter = new FormControl('');
  filterdata: FilterData;
  search(text: string): Category[] {
    if (this.category == null) {
      return null;
    }

    let data = this.category.filter(category => {
      const term = text.toLowerCase();
      return (
        category.name.toLowerCase().includes(term) ||
        category.subCategory.toLowerCase().includes(term) ||
        category.category.toLowerCase().includes(term)
      );
    });
    data = this.filterdata.filter(data);

    return data.sort((a, b) => a.name.localeCompare(b.name));
  }

  constructor(
    private loadCategory: LoadDataService,
    private route: ActivatedRoute
  ) {
    this.filterdata = new FilterData(route);


  }
  ngOnInit(): void {
    this.loadCategory.Category$.subscribe(it => (this.category = it.Cat));
    const changeFirst = this.filterdata.pipe(
      startWith(''),
      map(it => this.filter.value)
    )
    const changeSecond = this.filter.valueChanges.pipe(
      startWith(''));

    this.categories$ = merge(changeFirst, changeSecond).pipe(

      map(text => this.search(text))
     );

  }
}
