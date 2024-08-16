import { Component, OnInit } from '@angular/core';
import { NominaElectronicaService } from 'src/app/services/nomina-electronica.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-reporte-ne',
  templateUrl: './reporte-ne.component.html',
  styleUrls: ['./reporte-ne.component.css']
})
export class ReporteNeComponent implements OnInit{

  // url_1 : string = 'https://backcompensaciones.gestionhq5.com.co/nominaElectronica/all';
  url_1 : string = 'http://localhost:9090/api/v1/nominaElectronica/';

  openModal = false
  wait = true
  logs_: any[] = [];
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  currentPageItems: any[] = [];
  pages: number[] = [];

  // PARAMETROS PARA BUSQUEDA
  idZoho: string;
  anio: string;
  mes: string;
  process: string;
  identificacion: string;
  //REGITRO PARA EL MODAL
  register:any ={};
  constructor(private neService:NominaElectronicaService){}

  // +'?'+"id=3413"
  ngOnInit(): void {
      this.wait = true
      this.neService.get_logs("all").subscribe(
          (data:any)=> 
          {
            console.log(data.body)
            this.wait = false
            this.logs_ = data.body;
            this.totalPages = Math.ceil(this.logs_.length / this.pageSize);
            this.setPage(1); // Establece la página actual
          }
      )
  }
  consultar(registro:any){
    this.neService.consultar("validate?"+"id="+registro.id).subscribe(
      (data:any)=> 
      {
        console.log(data.body)
        this.register = data.body
        this.openModal = true
      }
  )
  }
  relanzarIndividual(registro:any){
    let tProcess_ = "relanzarlogindividual"
    this.neService.relanzar(tProcess_,{id:registro.id}).subscribe(
      (data:any)=> 
      {
        console.log(data.body)
        this.wait = false
      }
  )
  }
  // lanzarIndividual(registro:any){
  //   this.neService.lanzar("lanzarIndividual",{id:registro.id}).subscribe(
  //     (data:any)=> 
  //     {
  //       console.log(data.body)
  //     }
  // )
  // }
  //PAGINACION
  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.currentPageItems = this.logs_.slice(startIndex, startIndex + this.pageSize);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }
  restart(){
    this.currentPageItems = this.logs_
    this.setPage(1);

  }
  onSearch(): void {

    const currentPage = this.currentPage;
    const pageSize = this.pageSize;

    this.currentPageItems = this.logs_.filter(
      (item) => {
        const matchId = this.idZoho ? item["zh_id_acumulado"] === this.idZoho : false;
        const matchIdentificacion = this.identificacion ? item["identificacion"] === this.identificacion : false;
        const matchAnio = Number(this.anio) ? item["anio"] === Number(this.anio) : false;
        const matchMes = Number(this.mes) ? item["mes"] === Number(this.mes) : false;
        const matchProcess = Number(this.process) ? item["id_process"] === Number(this.process) : false;
  
        return matchId || matchIdentificacion || matchAnio || matchMes || matchProcess;
      }
    );
    // Calcular el número total de páginas después de la búsqueda
    this.totalPages = Math.ceil(this.currentPageItems.length / this.pageSize);

    // Restablecer la paginación utilizando los datos guardados
    // this.setPage(currentPage);
  }

}
