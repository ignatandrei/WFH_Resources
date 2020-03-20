import { Category } from './Category';
export class Categories {
  constructor(public Cat: Category[]) {
  }
  public Dates(): Date[] {
    const dt = this.Cat
      .map(it => Date.parse(it.dateCreated))
      .map(it => new Date(it))
      .map(it => it.setHours(0, 0, 0, 0));
    var s = [...new Set(dt)];
    return s.map(it => new Date(it));

  }
}
