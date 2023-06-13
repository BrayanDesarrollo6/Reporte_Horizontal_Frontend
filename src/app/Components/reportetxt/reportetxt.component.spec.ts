import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportetxtComponent } from './reportetxt.component';

describe('ReportetxtComponent', () => {
  let component: ReportetxtComponent;
  let fixture: ComponentFixture<ReportetxtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportetxtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportetxtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
