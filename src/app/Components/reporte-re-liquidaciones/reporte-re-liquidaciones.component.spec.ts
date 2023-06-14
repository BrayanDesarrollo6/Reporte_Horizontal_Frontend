import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteReLiquidacionesComponent } from './reporte-re-liquidaciones.component';

describe('ReporteReLiquidacionesComponent', () => {
  let component: ReporteReLiquidacionesComponent;
  let fixture: ComponentFixture<ReporteReLiquidacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteReLiquidacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteReLiquidacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
