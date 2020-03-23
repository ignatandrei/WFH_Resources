import { Component, OnInit, PipeTransform } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DecimalPipe } from "@angular/common";
import { map, startWith } from "rxjs/operators";
import { Observable, merge } from "rxjs";
import { Category } from "./Category";
import { allData } from "./data";
import { LoadDataService } from "../load-data.service";
import { ThrowStmt } from "@angular/compiler";
import {
  ActivatedRoute,
  UrlTree,
  Router,
  PRIMARY_OUTLET,
  UrlSegmentGroup,
  UrlSegment
} from "@angular/router";
import { FilterData } from "./filterData";
@Component({
  selector: "app-table-wfh",
  templateUrl: "./table-wfh.component.html",
  styleUrls: ["./table-wfh.component.css"],
  providers: []
})
export class TableWFHComponent implements OnInit {
  category: Category[];
  buttonChanger: string = "";
  linkPath: any;
  urlStatus: string;
  categories$: Observable<Category[]>;
  filter = new FormControl("");
  filterdata: FilterData;
  darkMode: string = "";

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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filterdata = new FilterData(route);
  }
  ngOnInit(): void {
    this.loadCategory.Category$.subscribe(it => (this.category = it.Cat));
    const changeFirst = this.filterdata.pipe(
      startWith(""),
      map(it => this.filter.value)
    );
    const changeSecond = this.filter.valueChanges.pipe(startWith(""));

    this.categories$ = merge(changeFirst, changeSecond).pipe(
      map(text => this.search(text))
    );
  }

  // getLinks(link: string) {
  //   const tree: UrlTree = this.router.parseUrl(link);
  //   const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
  //   const s: UrlSegment[] = g.segments;
  //   return s[0].path;
  // }
  getLinkName(link: string) {
    const url = link;
    const urlParts = /^(?:\w+\:\/\/)?([^\/]+)(.*)$/.exec(url);
    const urlPart = /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/.exec(
      url
    );

    if (link !== null && link.length > 1) {
      const host = urlPart[2];
      this.buttonChanger = "btn-outline-dark";
      // console.log(urlPart);

      this.urlStatus = "Available @" + host;
    }
    // } else if ((host = host && link !== null && link.length > 1)) {
    //   return "tesst";
    // }
    else {
      this.buttonChanger = "btn-danger";

      this.urlStatus = "Link not available";
    }
  }
  changeDarkMode() {
    this.buttonChanger = "btn-outline-light";
    this.darkMode = "table-dark";
  }
}
