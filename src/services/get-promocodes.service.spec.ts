import { TestBed } from '@angular/core/testing';

import { GetPromocodesService } from './get-promocodes.service';

describe('GetPromocodesService', () => {
  let service: GetPromocodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPromocodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
