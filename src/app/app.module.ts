import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { BrandComponent } from './components/brand/brand.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from "@angular/material/button";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import { BrandDialogComponent } from './components/brand/brand-dialog/brand-dialog.component';
import { MonitorDialogComponent } from './components/monitor/monitor-dialog/monitor-dialog.component';
import {GlobalService} from "./api/services/global.service";
import {LocalisationInitializer} from "./config/LocalisationInitializer";
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from "@angular/material/card";
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import {appInitProviders} from "./api/services/app-init.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MonitorComponent,
    BrandComponent,
    HeaderComponent,
    BrandDialogComponent,
    MonitorDialogComponent,
    LoginComponent,
    MessageDialogComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule
  ],
  providers: [
    GlobalService,
    {
      provide: MatPaginatorIntl,
      useFactory: () => new LocalisationInitializer().paginatorInitializer(),
    },
    appInitProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
