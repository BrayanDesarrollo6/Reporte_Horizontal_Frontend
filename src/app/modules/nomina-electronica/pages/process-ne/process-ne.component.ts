import { Component, OnInit } from '@angular/core';
import { NominaElectronicaService } from 'src/app/services/nomina-electronica.service';
import { CurrencyPipe } from '@angular/common';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-process-ne',
  templateUrl: './process-ne.component.html',
  styleUrls: ['./process-ne.component.css']
})
export class ProcessNeComponent implements OnInit{

  wait = true
  process: any[] = [];
  logs_: any[] = [];
  pageSize: number = 20;
  currentPage: number = 1;
  totalPages: number = 0;
  currentPageItems: any[] = [];
  pages: number[] = [];
  title =""
  descripcion =""

  constructor(private neService:NominaElectronicaService){}
  
  ngOnInit(): void {
    this.wait = true
    this.neService.get_process("process/all").subscribe(
        (data:any)=> 
        {
          console.log(data.body)
          this.wait = false
          this.process = data.body;
          this.totalPages = Math.ceil(this.process.length / this.pageSize);
          this.setPage(1); // Establece la página actual
        }
    )
}
  //PAGINACION
  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.currentPageItems = this.process.slice(startIndex, startIndex + this.pageSize);
    this.pages = Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
  prevPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  relanzar(registro:any){
    let tProcess_ = "relanzarProcess"
    if(registro.type_process == "1-2" || registro.type_process == "2-2" || registro.type_process == "3-2"){
      tProcess_ = "relanzarIndividual"
    }
    this.neService.relanzar(tProcess_,{id:registro.id}).subscribe(
      (data:any)=> 
      {
        console.log(data.body)
        this.wait = false
      }
  )
  }
  consultar(registro:any){
    this.logs_=[]
    this.wait = true
    this.neService.consultarProcess("process/validate?"+"id="+registro.id).subscribe(
      (data:any)=> 
      {
        console.log(data)
        if ('estado' in data.body) {
          this.descripcion = data.body.descripcion
          this.title = data.body.estado
        }
        else{
          this.title = "Registros"
          this.logs_ = data.body
        }
        this.wait = false

      }
  )
  }
//exportar a excel
exportToExcel(name:string): void {
  // if(this.nominas.length > 0){
    const table = document.getElementById(name);
    
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    
    /* guardar el archivo */
    XLSX.writeFile(wb, `data.xlsx`);
  // }
  
}
}
