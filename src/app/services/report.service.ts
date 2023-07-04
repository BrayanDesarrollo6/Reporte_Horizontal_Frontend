import { Injectable } from '@angular/core'
import {HttpClient, HttpContext, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  // URL_API = 'http://localhost:4000/';
  constructor(private http : HttpClient) { }

  post_reporte(url:string, body:object){
    return this.http.post(url, body, {responseType: 'json'});
  }
  get_report(url:string){
    return this.http.get(url, {responseType: 'blob'});
  }
  post_txtss(url:string, body:object){
    return this.http.post(url, body, {responseType: 'json'});
  }
  get_txtss(url:string){
    return this.http.get(url, {responseType: 'blob'});
  }
  post_empresas(url:string, body:object){
    return this.http.post(url, body, {responseType: 'json'});
  }
  get_empresas(url:string){
    return this.http.get(url, {responseType: 'json'});
  }
  post_lq(url:string, body:object){
    return this.http.post(url, body, {responseType: 'json'});
  }
  get_lq(url:string){
    return this.http.get(url, {responseType: 'blob'});
  }
}
