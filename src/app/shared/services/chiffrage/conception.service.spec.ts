import { TestBed } from '@angular/core/testing';

import { ConceptionService } from './conception.service';

describe('ConceptionService', () => {
  let service: ConceptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConceptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
