import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ReportehorizontalComponent } from './Components/reportehorizontal/reportehorizontal.component';
import { ReportetxtComponent } from './Components/reportetxt/reportetxt.component';
import { ReporteLiquidacionesComponent } from "./Components/reporte-liquidaciones/reporte-liquidaciones.component";
import { ReporteReLiquidacionesComponent } from "./Components/reporte-re-liquidaciones/reporte-re-liquidaciones.component";
import { ReporteDHLComponent } from './Components/reporte-dhl/reporte-dhl.component';
import { DashBoardComponent } from './modules/nomina-electronica/pages/dash-board/dash-board.component';
import { ReporteNeComponent } from './modules/nomina-electronica/pages/reporte-ne/reporte-ne.component';
import { ProcessNeComponent } from './modules/nomina-electronica/pages/process-ne/process-ne.component';
const routes: Routes = [
  { 
    path: '', component: HomeComponent 
  },
  { 
    path: 'home', component: HomeComponent 
  },
  { 
    path: 'reportehorizontal', component: ReportehorizontalComponent 
  },
  { 
    path: 'reportehorizontaldhl', component: ReporteDHLComponent 
  },
  { 
    path: 'reporteLiquidaciones', component: ReporteLiquidacionesComponent
  },
  { 
    path: 'reporteReLiquidaciones', component: ReporteReLiquidacionesComponent
  },
  { 
    path: 'reportetxt', component: ReportetxtComponent
  },
  // NOMINA ELECTRONICA
  { 
    path: 'dashboard-ne', component: DashBoardComponent
  },
  { 
    path: 'report-ne', component: ReporteNeComponent
  },
  { 
    path: 'process-ne', component: ProcessNeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }