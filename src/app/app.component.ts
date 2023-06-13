import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(){}
  ObtenerLocalStorage(){
    let Mode = localStorage.getItem("Mode");
    const mode = document.getElementById("Navbar");
    const mode_footer = document.getElementById("Footer");
    const Light = document.getElementById('Icon_Mode');
    const Dark = document.getElementById('Icon_Mode_2');
    const Logo_2 = document.getElementById('Logo_2');
    const Logo_3 = document.getElementById('Logo_3');
    if(Mode == "dark"){
      mode?.classList.remove('mode');
      mode_footer?.classList.remove('mode');
      if (Light != undefined && Logo_3 != undefined) {Light.style.display = 'block'; Logo_3.style.display = 'block';}
      if (Dark != undefined && Logo_2 != undefined) {Dark.style.display = 'none';  Logo_2.style.display = 'none';}
    }
    else{
      mode?.classList.add('mode');
      mode_footer?.classList.add('mode');
      if (Light != undefined && Logo_3 != undefined) {Light.style.display = 'none'; Logo_3.style.display = 'none';}
      if (Dark != undefined && Logo_2 != undefined) {Dark.style.display = 'block';   Logo_2.style.display = 'block';}
    }
  }
  ngOnInit(): void {
    this.ObtenerLocalStorage();
  }
}
