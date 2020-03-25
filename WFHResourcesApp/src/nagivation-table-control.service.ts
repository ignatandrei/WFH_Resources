import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class NagivationTableControlService {
  constructor() {}
  private navTableSource = new Subject<any>();
  public navTableObservable = this.navTableSource.asObservable();
  navTableAnnounce(filterSource: any) {
    this.navTableSource.next(filterSource);
  }
}
