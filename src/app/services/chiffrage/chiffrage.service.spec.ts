import { TestBed } from '@angular/core/testing';

import { ChiffrageService } from './chiffrage.service';

describe('ChiffrageService', () => {
  let service: ChiffrageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiffrageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
