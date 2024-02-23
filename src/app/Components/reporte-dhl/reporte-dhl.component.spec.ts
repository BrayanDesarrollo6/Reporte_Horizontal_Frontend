import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDHLComponent } from './reporte-dhl.component';

describe('ReporteDHLComponent', () => {
  let component: ReporteDHLComponent;
  let fixture: ComponentFixture<ReporteDHLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteDHLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteDHLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
