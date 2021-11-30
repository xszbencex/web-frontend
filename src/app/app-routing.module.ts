import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BrandComponent} from "./components/brand/brand.component";
import {MonitorComponent} from "./components/monitor/monitor.component";

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'Web Frontend - Főoldal'}},
  {path: 'brand', component: BrandComponent, data: {title: 'Web Frontend - Márkák'}},
  {path: 'monitor', component: MonitorComponent, data: {title: 'Web Frontend - Monitorok'}},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
