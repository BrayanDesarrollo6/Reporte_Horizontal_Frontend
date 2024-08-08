import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { ReportehorizontalComponent } from './Components/reportehorizontal/reportehorizontal.component';
import { ReportetxtComponent } from './Components/reportetxt/reportetxt.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReporteLiquidacionesComponent } from './Components/reporte-liquidaciones/reporte-liquidaciones.component';
import { ReporteReLiquidacionesComponent } from './Components/reporte-re-liquidaciones/reporte-re-liquidaciones.component';
import { ReporteDHLComponent } from './Components/reporte-dhl/reporte-dhl.component';
import { ReporteNeComponent } from './modules/nomina-electronica/pages/reporte-ne/reporte-ne.component';
import { DashBoardComponent } from './modules/nomina-electronica/pages/dash-board/dash-board.component';
import { ProcessNeComponent } from './modules/nomina-electronica/pages/process-ne/process-ne.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ReportehorizontalComponent,
    ReportetxtComponent,
    ReporteLiquidacionesComponent,
    ReporteReLiquidacionesComponent,
    ReporteDHLComponent,
    DashBoardComponent,
    ReporteNeComponent,
    ProcessNeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule 
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
