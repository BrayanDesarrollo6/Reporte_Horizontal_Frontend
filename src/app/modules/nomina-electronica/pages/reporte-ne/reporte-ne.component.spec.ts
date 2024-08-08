import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteNeComponent } from './reporte-ne.component';

describe('ReporteNeComponent', () => {
  let component: ReporteNeComponent;
  let fixture: ComponentFixture<ReporteNeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteNeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
