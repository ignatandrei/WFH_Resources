import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NagivationTableControlService {
  constructor() {}
  private missionAnnouncedSource = new Subject<string>();
  issionAnnounced$ = this.missionAnnouncedSource.asObservable();
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
}
