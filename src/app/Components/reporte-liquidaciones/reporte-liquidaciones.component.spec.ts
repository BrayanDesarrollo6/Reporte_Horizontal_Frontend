import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteLiquidacionesComponent } from './reporte-liquidaciones.component';

describe('ReporteLiquidacionesComponent', () => {
  let component: ReporteLiquidacionesComponent;
  let fixture: ComponentFixture<ReporteLiquidacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteLiquidacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteLiquidacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
