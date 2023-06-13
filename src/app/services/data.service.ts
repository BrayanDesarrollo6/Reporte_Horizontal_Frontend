import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  @Output() DisparadorModo: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
