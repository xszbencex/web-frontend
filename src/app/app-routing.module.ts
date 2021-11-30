import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BrandComponent} from "./components/brand/brand.component";
import {MonitorComponent} from "./components/monitor/monitor.component";
import {AuthGuard} from "./config/AuthGuard";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', component: LoginComponent, data: {title: 'Web Frontend - Bejelentkezés'}},
  {path: 'login', component: LoginComponent, data: {title: 'Web Frontend - Bejelentkezés'}},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {title: 'Web Frontend - Főoldal'}},
  {path: 'brand', component: BrandComponent, canActivate: [AuthGuard], data: {title: 'Web Frontend - Márkák'}},
  {path: 'monitor', component: MonitorComponent, canActivate: [AuthGuard], data: {title: 'Web Frontend - Monitorok'}},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
