import { Component, OnInit, PipeTransform } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DecimalPipe } from "@angular/common";
import { map, startWith } from "rxjs/operators";
import { Observable } from "rxjs";

interface Category {
  id: number;
  tags: string;
  category: string;
  subCategory: string;
  name: string;
  description: string;
  link: string;
}

@Component({
  selector: "app-table-wfh",
  templateUrl: "./table-wfh.component.html",
  styleUrls: ["./table-wfh.component.css"],
  providers: [DecimalPipe]
})
export class TableWFHComponent implements OnInit {
  category: Category[] = [
    {
      id: 1,
      tags: "Canada",
      category: "Free Software",
      subCategory: "Adobe",
      name: "Adobe Connect conferencing",
      description: "a",
      link: "https://google.ro"
    },
    {
      id: 2,
      tags: "Canada",
      category: "Free Software",
      subCategory: "9976140",
      name: "Canada",
      description: "a",
      link: "https://google.ro"
    },
    {
      id: 3,
      tags: "Canada",
      category: "Free Software",
      subCategory: "9976140",
      name: "Canada",
      description: "a",
      link: "https://google.ro"
    },
    {
      id: 4,
      tags: "Canada",
      category: "Free Software",
      subCategory: "9976140",
      name: "Canada",
      description: "a",
      link: "https://google.ro"
    }
  ];
  search(text: string, pipe: PipeTransform): Category[] {
    return this.category.filter(category => {
      const term = text.toLowerCase();
      return (
        category.name.toLowerCase().includes(term) ||
        pipe.transform(category.subCategory).includes(term) ||
        pipe.transform(category.category).includes(term)
      );
    });
  }

  categories$: Observable<Category[]>;
  filter = new FormControl("");

  constructor(pipe: DecimalPipe) {
    this.categories$ = this.filter.valueChanges.pipe(
      startWith(""),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {}
}
