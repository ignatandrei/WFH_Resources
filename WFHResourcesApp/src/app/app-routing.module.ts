import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WfhNavigationComponent } from './wfh-navigation/wfh-navigation.component';
import { AboutComponent } from './about/about.component';
import { TableWFHComponent } from './table-wfh/table-wfh.component';
import { CovidApiInfoComponent } from './covid-api-info/covid-api-info.component';


const routes: Routes = [
  { path: '', redirectTo: '/resources', pathMatch: 'full' },
  { path: 'resources', component: TableWFHComponent },
  { path: 'about', component: AboutComponent},
  { path: 'covidData', component: CovidApiInfoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
