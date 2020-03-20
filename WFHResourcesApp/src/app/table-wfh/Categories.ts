import { Category } from './Category';
import * as moment from 'moment';
export class Categories {
  constructor(public Cat: Category[]) {
  }
  public Dates(): moment.Moment[] {
    const dt = this.Cat
      .map(it => Date.parse(it.dateCreated))
      .map(it => new Date(it))
      .map(it => it.setHours(0, 0, 0, 0));

    const s = [...new Set(dt)];
    return s
        .sort((a, b) => b - a)
        .map(it =>  moment(new Date(it)));

  }

  public Categories(): Map<string, string[]> {
    const map = new Map<string, string[]> ();

    this.Cat.forEach((item) => {
      const key = item.category;
      const collection = map.get(key);
      if (!collection) {
          map.set(key, [item.subCategory]);
      } else {
          if (collection.indexOf(item.subCategory) < 0) {
          collection.push(item.subCategory);
          }
      }
 });
    return map;

  }


}
