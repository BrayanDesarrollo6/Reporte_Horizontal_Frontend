import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ReportehorizontalComponent } from './Components/reportehorizontal/reportehorizontal.component';
import { ReportetxtComponent } from './Components/reportetxt/reportetxt.component';
import { ReporteLiquidacionesComponent } from "./Components/reporte-liquidaciones/reporte-liquidaciones.component";
import { ReporteReLiquidacionesComponent } from "./Components/reporte-re-liquidaciones/reporte-re-liquidaciones.component";
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
    path: 'reporteLiquidaciones', component: ReporteLiquidacionesComponent
  },
  { 
    path: 'reporteReLiquidaciones', component: ReporteReLiquidacionesComponent
  },
  { 
    path: 'reportetxt', component: ReportetxtComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }