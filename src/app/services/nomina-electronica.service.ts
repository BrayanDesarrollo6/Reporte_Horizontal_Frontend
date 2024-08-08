import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class NominaElectronicaService {

  constructor(private http : HttpClient) { }

  url : string = 'http://localhost:8072/api/v1/nominaElectronica/';

  get_logs(params:string){
    return this.http.get(this.url+params);
  }
  consultar(params:string){
    return this.http.get(this.url+params);
  }
  get_process(params:string){
    return this.http.get(this.url+params);
  }
  relanzar(params:string,data:any){
    return this.http.post(this.url+params,data);
  }
  lanzar(params:string,data:any){
    return this.http.post(this.url+params,data);
  }
  consultarProcess(params:string){
    return this.http.get(this.url+params);
  }
}
