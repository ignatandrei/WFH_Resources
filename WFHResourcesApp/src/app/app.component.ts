import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  QueryList
} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "WFHResourcesApp";
}
