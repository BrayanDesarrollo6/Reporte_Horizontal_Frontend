import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportehorizontalComponent } from './reportehorizontal.component';

describe('ReportehorizontalComponent', () => {
  let component: ReportehorizontalComponent;
  let fixture: ComponentFixture<ReportehorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportehorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportehorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
