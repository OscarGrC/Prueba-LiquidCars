import { TestBed } from '@angular/core/testing';

import { ExpedienteServiceService } from './expediente.service';

describe('ExpedienteServiceService', () => {
  let service: ExpedienteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpedienteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
