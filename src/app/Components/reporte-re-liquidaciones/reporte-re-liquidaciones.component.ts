import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { saveAs } from 'file-saver-es';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
  empresas: string[] = [];
  estadoslist: string[] = [];
  disableSelect = new FormControl(true);

  url_7 : string = 'http://localhost:4001/getEmpresasrelq';
  url_8 : string = 'http://localhost:4001/procesarrelq';
  // url_7 : string = 'https://backcompensaciones.gestionhq5.com.co/getEmpresasrelq';
  // url_8 : string = 'https://backcompensaciones.gestionhq5.com.co/procesarrelq';

  constructor(private reportservice: ReportService,  private formbuilder: FormBuilder, private dataservice: DataService, private title: Title, private httpService: HttpClient){
    title.setTitle('Reporte Liquidaciones');
  }

  updateEmpresas(){  
    console.log("Actualizando empresas");
    const login = document.getElementById("container_all");
    const loadinggif = document.getElementById("loading");
    const alert_message = document.getElementById("alert");
    if (login != undefined){login.style.display = "none";}
    if (loadinggif != undefined){loadinggif.style.display = "block";}
    this.reportservice.post_empresas(this.url_7, {Data: "1"}).subscribe
    (
      (data: object) => 
      {
        this.RespuestaJson = data;
        console.log(this.RespuestaJson);
        if(this.RespuestaJson.process === '0')
        {
          this.message = 'El reporte se encuentra vacío, por favor válida la información ingresada.';
          if (loadinggif != undefined){loadinggif.style.display = "none";}
          if (alert_message != undefined){alert_message.style.display = "block";}
        }
        else if(this.RespuestaJson.process === '1')
        {
          if(login != undefined){login.style.display = "block";}
          if(loadinggif != undefined){loadinggif.style.display = "none";}
          this.reportservice.get_empresas(this.url_7).subscribe({
            next: (data: object) => {
              this.RespuestaJson = data;        
              this.estadoslist = this.RespuestaJson.Estados.sort();
              this.empresas = this.RespuestaJson.Empresas.sort();
            },
            error: (error: HttpErrorResponse) => {
              console.log(error.message);
            }
          });
        }
      }
    )
  }

  post_reporte(){    
    const login = document.getElementById("container_all");
    const loadinggif = document.getElementById("loading");
    const alert_message = document.getElementById("alert");
    let a : any = {Data: (this.formreport.value)};
    console.log(a);
    if (login != undefined){login.style.display = "none";}
    if (loadinggif != undefined){loadinggif.style.display = "block";}
    this.reportservice.post_lq(this.url_8, {Data: (this.formreport.value)}).subscribe
    (
      (data: object) => 
      {
        this.RespuestaJson = data;
        if(this.RespuestaJson.process === '1')
        {
          this.reportservice.get_txtss(this.url_8).subscribe
          (
            (data: Blob) => 
            {
              if (login != undefined){login.style.display = "block";}
              if (loadinggif != undefined){loadinggif.style.display = "none";}
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result);
            }
          )
        }
        else
        {
          this.message = 'El reporte se encuentra vacío, por favor válida la información ingresada.';
          if (loadinggif != undefined){loadinggif.style.display = "none";}
          if (alert_message != undefined){alert_message.style.display = "block";}
        }
      }
    )
  }
  
  regresar(){
    const alert_message = document.getElementById("alert");
    const login = document.getElementById("container_all");
    if (alert_message != undefined){alert_message.style.display = "none";}
    if (login != undefined){login.style.display = "block";}
  }
  
  ObtenerLocalStorage(){
    let Mode = localStorage.getItem("Mode");
    const mode = document.getElementById("login");
    if(Mode == "dark"){mode?.classList.remove('mode');}
    else{mode?.classList.add('mode');}
  }
  
  ngOnInit(): void {
    this.reportservice.get_empresas(this.url_7).subscribe({
      next: (data: object) => {
        this.RespuestaJson = data;        
        this.estadoslist = this.RespuestaJson.Estados.sort();
        this.empresas = this.RespuestaJson.Empresas.sort();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });
    this.formreport = this.formbuilder.group({
      empresa:['',Validators.required],
      estados:['',Validators.required],
      anio: new FormControl({value:'', disabled: true}),
      mes: new FormControl({value:'', disabled: true}),
    });
    this.ObtenerLocalStorage();
    this.dataservice.DisparadorModo.subscribe(data =>{
      this.Modo = data.data;
      const mode = document.getElementById("login");
      if(this.Modo == 'light'){mode?.classList.add('mode');}
      if(this.Modo == 'dark'){mode?.classList.remove('mode');}
    })
  }
  
  enable_input_2(){
    let input_one = this.formreport.get('estados')?.value;
    if(input_one == "Pendiente" || input_one == "")
    {
      this.formreport.get('anio')?.disable();
      this.formreport.get('mes')?.disable();
    }
    else
    {
      this.formreport.get('anio')?.enable();
      this.formreport.get('mes')?.enable();
    }
  }
}
