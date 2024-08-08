import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessNeComponent } from './process-ne.component';

describe('ProcessNeComponent', () => {
  let component: ProcessNeComponent;
  let fixture: ComponentFixture<ProcessNeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessNeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessNeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
