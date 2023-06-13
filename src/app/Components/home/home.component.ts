import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ReportService } from 'src/app/services/report.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  Modo : string = "";
  constructor(private dataservices: ReportService, private dataservice: DataService, private title: Title, private router: Router){
    title.setTitle('HQ5 S.A.S');  
  }
  reporth(){
    this.router.navigate(['reportehorizontal']);
  }
  reportt(){
    this.router.navigate(['reportetxt']);
  }
  ObtenerLocalStorage(){
    let Mode = localStorage.getItem("Mode");
    const mode = document.getElementById("container_home");
    if(Mode == "dark"){mode?.classList.remove('mode');}
    else{mode?.classList.add('mode');}
  }
  ngOnInit(): void {
    this.ObtenerLocalStorage();
    this.dataservice.DisparadorModo.subscribe(data =>{
      this.Modo = data.data;
      const mode = document.getElementById("container_home");
      if(this.Modo == 'light'){mode?.classList.add('mode');}
      if(this.Modo == 'dark'){mode?.classList.remove('mode');}
    })
  }
}
