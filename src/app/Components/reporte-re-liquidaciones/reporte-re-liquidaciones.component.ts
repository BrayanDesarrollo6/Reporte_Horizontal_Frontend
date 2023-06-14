import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { saveAs } from 'file-saver-es';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte-re-liquidaciones',
  templateUrl: './reporte-re-liquidaciones.component.html',
  styleUrls: ['./reporte-re-liquidaciones.component.css']
})
export class ReporteReLiquidacionesComponent {
  formreport!: FormGroup;
  RespuestaJson: any;
  Modo : string = "";
  message : string = "";
  empresas: any[] = [
    {value: "Agrupar ID proceso", viewValue: "Agrupar ID proceso"},
    {value: "Clasificar ID proceso", viewValue: "Clasificar ID proceso"}
  ];
  url_1 : string = 'http://localhost:4001/procesar';
  url_2 : string = 'http://localhost:4001/procesar2';
  url_3 : string = 'http://localhost:4001/procesar3';
  // url_1 : string = 'http://164.92.109.128:4001/procesar';
  // url_2 : string = 'http://164.92.109.128:4001/procesar2';
  // url_3 : string = 'http://164.92.109.128:4001/procesar3';
  // url_1 : string = 'https://backcompensaciones.gestionhq5.com.co/procesar';
  // url_2 : string = 'https://backcompensaciones.gestionhq5.com.co/procesar2';
  // url_3 : string = 'https://backcompensaciones.gestionhq5.com.co/procesar3';
  constructor(private reportservice: ReportService,  private formbuilder: FormBuilder, private dataservice: DataService, private title: Title){
    title.setTitle('Reporte Horizontal');
  }
  ObtenerLocalStorage(){
    let Mode = localStorage.getItem("Mode");
    const mode = document.getElementById("login");
    if(Mode == "dark"){mode?.classList.remove('mode');}
    else{mode?.classList.add('mode');}
  }
  ngOnInit(): void {
    this.formreport = this.formbuilder.group({
      empresa:['Agrupar ID proceso',Validators.required],
    });
    this.ObtenerLocalStorage();
    this.dataservice.DisparadorModo.subscribe(data =>{
      this.Modo = data.data;
      const mode = document.getElementById("login");
      if(this.Modo == 'light'){mode?.classList.add('mode');}
      if(this.Modo == 'dark'){mode?.classList.remove('mode');}
    })
  }
}
