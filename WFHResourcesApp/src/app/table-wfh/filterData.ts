import { Category } from './Category';
import { ActivatedRoute, Params } from '@angular/router';
import { EventEmitter } from '@angular/core';
export class FilterData extends EventEmitter<FilterData> {


  constructor(private route: ActivatedRoute) {
      super();
      const self = this;
      route.queryParams.subscribe(params => {
          const newParams = this.toLower(params);
          self.category = newParams.category;
          self.subCategory= newParams.subcategory;

          if (self.ShouldFilter()) {
            self.emit(this);
      }
    });
  }

  private toLower(params: Params): Params {
    const lowerParams: Params = {};
    for (const key in params) {
        lowerParams[key.toLowerCase()] = params[key];
    }   

    return lowerParams;
}
  public category: string = null;
  public subCategory: string = null;
  private ShouldFilter(): boolean {
    return !(this.category == null && this.subCategory == null);
  }
  public filter(cat: Category[]): Category[] {
    if (!this.ShouldFilter()) {
      return cat;
    }
    let ret = cat;
    if (this.category != null) {
      ret = ret.filter(it => it.category.toLowerCase() === this.category.toLowerCase());
    }
    if (this.subCategory != null) {
      ret = ret.filter(it => it.subCategory.toLowerCase() == this.subCategory.toLowerCase());
    }
    return ret;
  }
}
