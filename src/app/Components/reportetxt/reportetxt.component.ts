import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { DataService } from 'src/app/services/data.service';
import { saveAs } from 'file-saver-es';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reportetxt',
  templateUrl: './reportetxt.component.html',
  styleUrls: ['./reportetxt.component.css']
})

export class ReportetxtComponent implements OnInit{
  public formtxt!: FormGroup;
  disableSelect = new FormControl(true);
  RespuestaJson: any;
  RespuestaLista : any;
  Replaces : any;
  Modo : string = "";
  groupslist: string[] = [];
  empresas: any[] = [
    {value: "HQ5 S.A.S", viewValue: "HQ5 S.A.S"},
    {value: "TECNO GESTION FD S A S", viewValue: "TECNO GESTION FD S A S"},
    {value: "TEMPOENLACE S.A.S", viewValue: "TEMPOENLACE S.A.S"},
    {value: "COOMPHIA SERVICIOS", viewValue: "COOMPHIA SERVICIOS"},
  ];
  
  //url_4 : string = 'http://localhost:4001/procesarTXTSS';
  url_4 : string = 'https://backcompensaciones.gestionhq5.com.co/procesarTXTSS';

  constructor(private reportservices: ReportService, private formbuilder: FormBuilder, public dataservice: DataService, private title: Title){
    title.setTitle('Reporte TXTSS');
  }
  
  post_txtss(){ 
    const login = document.getElementById("login_box");
    const loadinggif = document.getElementById("loading");
    const alert_message = document.getElementById("alert");
    let a : any = {Data: (this.formtxt.value)};
    console.log(a);
    if (login != undefined){login.style.display = "none";}
    if (loadinggif != undefined){loadinggif.style.display = "block";}
    this.reportservices.post_txtss(this.url_4, {Data: (this.formtxt.value)}).subscribe
    (
      (data: object) => 
      {
        this.RespuestaJson = data;
        if(this.RespuestaJson.process === '1')
        {
          this.reportservices.get_txtss(this.url_4).subscribe
          (
            (data: Blob) => 
            {
              if (login != undefined){login.style.display = "block";}
              if (loadinggif != undefined){loadinggif.style.display = "none";}
              let downloadurl = window.URL.createObjectURL(data);
              saveAs(downloadurl, this.RespuestaJson.result);
              this.formtxt.get('groups')?.reset();
            }
          )
        }
        else if(this.RespuestaJson.process === '2')
        {
          if (login != undefined){login.style.display = "block";}
          if (loadinggif != undefined){loadinggif.style.display = "none";}
          this.disableSelect.setValue(false);
          this.RespuestaLista = this.RespuestaJson.result.replace('[', '');
          this.RespuestaLista = this.RespuestaLista.replace(']', '');
          this.Replaces = /'/g;
          this.RespuestaLista = this.RespuestaLista.replace(this.Replaces, "");
          this.RespuestaLista = this.RespuestaLista.split(',');
          this.groupslist = [];
          for (let Elemento of this.RespuestaLista){this.groupslist.push(Elemento);}
        }
        else
        {
          if (loadinggif != undefined){loadinggif.style.display = "none";}
          if (alert_message != undefined){alert_message.style.display = "block";}
          this.groupslist = [];
          this.formtxt.get('anio')?.reset();
          this.formtxt.get('mes')?.reset();
          this.formtxt.get('empresa')?.reset();
          this.formtxt.get('groups')?.reset();
        }
      }
    )
  }
  
  regresar(){
    const alert_message = document.getElementById("alert");
    const login = document.getElementById("login_box");
    if (alert_message != undefined){alert_message.style.display = "none";}
    if (login != undefined){login.style.display = "block";}
  }
  
  ObtenerLocalStorage(){
    let Mode = localStorage.getItem("Mode");
    const mode = document.getElementById("login_txt");
    if(Mode == "dark"){mode?.classList.remove('mode');}
    else{mode?.classList.add('mode');}
  }
  
  ngOnInit(): void {
    this.formtxt = this.formbuilder.group({
      empresa:['HQ5 S.A.S',Validators.required],
      anio:['2023',[Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      mes:['',[Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
      groups:[],
    });
    this.ObtenerLocalStorage();
    this.dataservice.DisparadorModo.subscribe(data =>{
      this.Modo = data.data;
      const mode = document.getElementById("login_txt");
      if(this.Modo == 'light'){mode?.classList.toggle('mode');}
      if(this.Modo == 'dark'){mode?.classList.toggle('mode');}
    })
  }
}
