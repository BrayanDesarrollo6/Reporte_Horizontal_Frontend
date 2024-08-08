import { TestBed } from '@angular/core/testing';

import { NominaElectronicaService } from './nomina-electronica.service';

describe('NominaElectronicaService', () => {
  let service: NominaElectronicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NominaElectronicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
