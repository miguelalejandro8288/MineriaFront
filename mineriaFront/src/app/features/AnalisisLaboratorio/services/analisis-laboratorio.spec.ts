import { TestBed } from '@angular/core/testing';

import { AnalisisLaboratorio } from './analisis-laboratorio';

describe('AnalisisLaboratorio', () => {
  let service: AnalisisLaboratorio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalisisLaboratorio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
