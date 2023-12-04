import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { saveAs } from 'file-saver-es';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reportehorizontal',
  templateUrl: './reportehorizontal.component.html',
  styleUrls: ['./reportehorizontal.component.css']
})

export class ReportehorizontalComponent implements OnInit{
  formreport!: FormGroup;
  RespuestaJson: any;
  Modo : string = "";
  message : string = "";
  idprocesos: any[] = [
    {value: "Agrupar ID proceso", viewValue: "Agrupar ID proceso"},
    {value: "Clasificar ID proceso", viewValue: "Clasificar ID proceso"}
  ];
  // url_1 : string = 'http://localhost:4001/procesar';
  // url_2 : string = 'http://localhost:4001/procesar2';
  // url_3 : string = 'http://localhost:4001/procesar3';
  // url_1 : string = 'http://164.92.109.128:4001/procesar';
  // url_2 : string = 'http://164.92.109.128:4001/procesar2';
  // url_3 : string = 'http://164.92.109.128:4001/procesar3';
  url_1 : string = 'https://backcompensaciones.gestionhq5.com.co/procesar';
  url_2 : string = 'https://backcompensaciones.gestionhq5.com.co/procesar2';
  url_3 : string = 'https://backcompensaciones.gestionhq5.com.co/procesar3';
  
  constructor(private reportservice: ReportService,  private formbuilder: FormBuilder, private dataservice: DataService, private title: Title){
    title.setTitle('Reporte Horizontal');
  }
  
  post_reporte(){ 
    const login = document.getElementById("container_all");
    const loadinggif = document.getElementById("loading");
    const alert_message = document.getElementById("alert");
    if (login != undefined){login.style.display = "none";}
    if (loadinggif != undefined){loadinggif.style.display = "block";}
    this.reportservice.post_reporte(this.url_1, {Data: (this.formreport.value)}).subscribe
    (
      (data: object) => 
      {
        this.RespuestaJson = data;        
        if(this.RespuestaJson.process === '0')
        {
          this.message = 'El reporte se encuentra vacío, por favor válida la información ingresada.';
          if (loadinggif != undefined){loadinggif.style.display = "none";}
          if (alert_message != undefined){alert_message.style.display = "block";}
        }
        else if(this.RespuestaJson.process === '1')
        {
          this.reportservice.get_report(this.url_1).subscribe
          (
            (data: Blob) => 
            {
              if (login != undefined){login.style.display = "block";}
              if (loadinggif != undefined){loadinggif.style.display = "none";}
              const fileReader: FileReader = new FileReader();
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result);
            }
          )
        }
        else if(this.RespuestaJson.process === '2')
        { 
          this.reportservice.get_report(this.url_1).subscribe
          (
            (data: Blob) => 
            {
              if (login != undefined){login.style.display = "block";}
              if (loadinggif != undefined){loadinggif.style.display = "none";}
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result[0]);
            }
          ) 
          this.reportservice.get_report(this.url_2).subscribe
          (
            (data: Blob) => 
            {
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result[1]);
            }
          ) 
        }
        else
        { 
          this.reportservice.get_report(this.url_1).subscribe
          (
            (data: Blob) => 
            {
              if (login != undefined){login.style.display = "block";}
              if (loadinggif != undefined){loadinggif.style.display = "none";}
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result[0]);
            }
          ) 
          this.reportservice.get_report(this.url_2).subscribe
          (
            (data: Blob) => 
            {
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result[1]);
            }
          )
          this.reportservice.get_report(this.url_3).subscribe
          (
            (data: Blob) => 
            {
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result[2]);
            }
          )  
        }
      }
    )
    this.formreport.get('idperiodo')?.reset();
    this.formreport.get('idperiodo2')?.reset();
    this.formreport.get('idperiodo3')?.reset();
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
    this.formreport = this.formbuilder.group({
      idproceso:['Agrupar ID proceso',Validators.required],
      idperiodo:['',[Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      idperiodo2: new FormControl({value:'', disabled: true}),
      idperiodo3: new FormControl({value:'', disabled: true})
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
    let input_one = this.formreport.get('idperiodo')?.value;
    let tamano_one : number = 0;
    if(input_one != null)
    {
      tamano_one = input_one.length;
    }
    if(tamano_one >= 4 && tamano_one <= 8)
    {
      this.formreport.get('idperiodo2')?.enable();
    }
    else
    {
      this.formreport.get('idperiodo2')?.disable();
      this.formreport.get('idperiodo3')?.disable();
      this.formreport.get('idperiodo2')?.reset();
      this.formreport.get('idperiodo3')?.reset();
    }
  }
  
  enable_input_3(){
    let input_two = this.formreport.get('idperiodo2')?.value;
    let tamano_two : Number = 0;
    if(input_two != null)
    {
      tamano_two = input_two.length;
    }
    if(Number(tamano_two) >= 4 && Number(tamano_two) <= 8)
    {
      this.formreport.get('idperiodo3')?.enable();
    }
    else
    {
      this.formreport.get('idperiodo3')?.disable();
      this.formreport.get('idperiodo3')?.reset();
    }
  }
}
