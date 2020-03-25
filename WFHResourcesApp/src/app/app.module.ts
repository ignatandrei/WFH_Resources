import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TableWFHComponent } from "./table-wfh/table-wfh.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WfhNavigationComponent } from "./wfh-navigation/wfh-navigation.component";
import { LayoutModule } from "@angular/cdk/layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AboutComponent } from "./about/about.component";
import { CovidApiInfoComponent } from './covid-api-info/covid-api-info.component';
import { CachingInterceptor } from './cachingInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    TableWFHComponent,
    WfhNavigationComponent,
    AboutComponent,
    CovidApiInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
