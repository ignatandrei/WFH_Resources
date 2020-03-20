import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Category } from './Category';
import { allData } from './data';
import { LoadDataService } from '../load-data.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-table-wfh',
  templateUrl: './table-wfh.component.html',
  styleUrls: ['./table-wfh.component.css'],
  providers: [DecimalPipe]
})
export class TableWFHComponent implements OnInit {
  category: Category[];
  categories$: Observable<Category[]>;
  filter = new FormControl('');

  search(text: string, pipe: PipeTransform): Category[] {
    if (this.category == null) {
      return null;
    }

    return this.category.filter(category => {
      const term = text.toLowerCase();
      return (
        category.name.toLowerCase().includes(term) ||
        pipe.transform(category.subCategory).includes(term) ||
        pipe.transform(category.category).includes(term)
      );
    });
  }


  constructor(pipe: DecimalPipe, private loadCategory: LoadDataService) {
    this.categories$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
      this.loadCategory.Category$.subscribe(it => this.category = it.Cat);
  }
}
