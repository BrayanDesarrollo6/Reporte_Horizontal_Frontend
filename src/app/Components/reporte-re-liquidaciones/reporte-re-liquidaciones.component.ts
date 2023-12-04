import { Component, OnDestroy, ElementRef } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver-es';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reporte-re-liquidaciones',
  templateUrl: './reporte-re-liquidaciones.component.html',
  styleUrls: ['./reporte-re-liquidaciones.component.css']
})

export class ReporteReLiquidacionesComponent implements OnDestroy {
  formreport!: FormGroup;
  RespuestaJson: any;
  Modo : string = "";
  message : string = "";
  empresas: string[] = [];
  estadoslist: string[] = [];
  disableSelect = new FormControl(true);

  // url_7 : string = 'http://localhost:4001/getEmpresasrelq';
  // url_8 : string = 'http://localhost:4001/procesarrelq';
  url_7 : string = 'https://backcompensaciones.gestionhq5.com.co/getEmpresasrelq';
  url_8 : string = 'https://backcompensaciones.gestionhq5.com.co/procesarrelq';

  constructor(
    private reportservice: ReportService,
    private formbuilder: FormBuilder,
    private dataservice: DataService,
    private title: Title,
    private httpService: HttpClient,
    private elementRef: ElementRef
  ) {
    title.setTitle('Reporte Reliquidaciones');
  }

  ngOnDestroy(): void {}

  isOpcionDeshabilitada(opcion: string): boolean {
    const estadosControl = this.formreport.get('estados');
    const seleccionActual = estadosControl?.value || [];

    return (
      (seleccionActual.includes('Pendiente') || seleccionActual.includes('Aprobada') || seleccionActual.includes('Enviada a Aprobación')) &&
      (opcion === 'Pagada' || opcion === 'Enviada al banco' || opcion === 'Enviada a Pago' || opcion === 'Enviada a pago sin paz y salvo')
    ) || (
      (seleccionActual.includes('Pagada') || seleccionActual.includes('Enviada al banco') || seleccionActual.includes('Enviada a Pago') || seleccionActual.includes('Enviada a pago sin paz y salvo')) &&
      (opcion === 'Pendiente' || opcion === 'Aprobada' || opcion === 'Enviada a Aprobación')
    );
  }

  updateEmpresas() {
    const login = document.getElementById('container_all');
    const loadinggif = document.getElementById('loading');
    const alert_message = document.getElementById('alert');

    if (login) {
      login.style.display = 'none';
    }
    if (loadinggif) {
      loadinggif.style.display = 'block';
    }

    this.reportservice.post_empresas(this.url_7, { Data: '0' }).subscribe(
      (data: object) => {
        this.handleUpdateEmpresasResponse(data, login, loadinggif, alert_message);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  private handleUpdateEmpresasResponse(data: object, login: HTMLElement | null, loadinggif: HTMLElement | null, alert_message: HTMLElement | null): void {
    this.RespuestaJson = data;

    if (this.RespuestaJson.process === '0') {
      this.message = 'El reporte se encuentra vacío, por favor valida la información ingresada.';
      this.hideLoadingAndShowAlert(loadinggif, alert_message);
    } else if (this.RespuestaJson.process === '1') {
      if (login) {
        login.style.display = 'block';
      }
      this.hideLoadingAndShowEmpresas(login, loadinggif, alert_message);
    }
  }

  private hideLoadingAndShowAlert(loadinggif: HTMLElement | null, alert_message: HTMLElement | null): void {
    if (loadinggif) {
      loadinggif.style.display = 'none';
    }
    if (alert_message) {
      alert_message.style.display = 'block';
    }
  }

  private hideLoadingAndShowEmpresas(login: HTMLElement | null, loadinggif: HTMLElement | null, alert_message: HTMLElement | null): void {
    if (loadinggif) {
      loadinggif.style.display = 'none';
    }

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

  post_reporte() {
    const login = document.getElementById('container_all');
    const loadinggif = document.getElementById('loading');
    const alert_message = document.getElementById('alert');

    if (login) {
      login.style.display = 'none';
    }
    if (loadinggif) {
      loadinggif.style.display = 'block';
    }

    const reportData = { Data: this.formreport.value };
    console.log(reportData);

    this.reportservice.post_lq(this.url_8, reportData).subscribe(
      (data: object) => {
        this.handlePostReporteResponse(data, login, loadinggif, alert_message);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  private handlePostReporteResponse(data: object, login: HTMLElement | null, loadinggif: HTMLElement | null, alert_message: HTMLElement | null): void {
    this.RespuestaJson = data;

    if (this.RespuestaJson.process === '1') {
      this.reportservice.get_lq(this.url_8).subscribe(
        (data: Blob) => {
          this.handleDownloadResponse(data, login, loadinggif);
        }
      );
    } else {
      this.message = 'El reporte se encuentra vacío, por favor valida la información ingresada.';
      this.hideLoadingAndShowAlert(loadinggif, alert_message);
    }
  }

  private handleDownloadResponse(data: Blob, login: HTMLElement | null, loadinggif: HTMLElement | null): void {
    if (login) {
      login.style.display = 'block';
    }
    if (loadinggif) {
      loadinggif.style.display = 'none';
    }

    const downloadurl = window.URL.createObjectURL(data);
    saveAs(downloadurl, this.RespuestaJson.result);
  }

  regresar() {
    const alertMessage = document.getElementById('alert');
    const login = document.getElementById('container_all');

    if (alertMessage) {
      alertMessage.style.display = 'none';
    }
    if (login) {
      login.style.display = 'block';
    }
  }
  
  ObtenerLocalStorage() {
    const mode = document.getElementById('login');
    const storedMode = localStorage.getItem('Mode');

    if (storedMode === 'dark' && mode) {
      mode.classList.remove('mode');
    } else if (mode) {
      mode.classList.add('mode');
    }
  }
  
  ngOnInit(): void {
    this.reportservice.get_empresas(this.url_7).subscribe({
      next: (data: object) => {
        this.handleGetEmpresasResponse(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    });

    this.formreport = this.formbuilder.group({
      empresa: ['', Validators.required],
      estados: ['', Validators.required],
      anio: new FormControl({ value: '', disabled: true }),
      mes: new FormControl({ value: '', disabled: true }),
    });

    this.ObtenerLocalStorage();

    this.dataservice.DisparadorModo.subscribe(data => {
      this.Modo = data.data;
      const mode = document.getElementById('login');
      if (this.Modo == 'light') {
        mode?.classList.add('mode');
      }
      if (this.Modo == 'dark') {
        mode?.classList.remove('mode');
      }
    });
  }

  private handleGetEmpresasResponse(data: object): void {
    this.RespuestaJson = data;
    this.estadoslist = this.RespuestaJson.Estados.filter((estado: string) => estado !== 'nan').sort();
    this.empresas = this.RespuestaJson.Empresas.sort();
  }

  enable_input_2() {
    const selectedOptions = this.formreport.get('estados')?.value || [];
    const isNotEmpty = selectedOptions.length > 0;
    const shouldEnable = isNotEmpty && !selectedOptions.includes("Pendiente") && !selectedOptions.includes("Aprobada") && !selectedOptions.includes("Enviada a Aprobación");
  
    if (shouldEnable) {
      this.formreport.get('anio')?.enable();
      this.formreport.get('mes')?.enable();
    } else {
      this.formreport.get('anio')?.disable();
      this.formreport.get('mes')?.disable();
    }
  }
  
}