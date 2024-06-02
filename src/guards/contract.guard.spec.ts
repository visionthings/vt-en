import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { contractGuard } from './contract.guard';

describe('contractGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => contractGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
