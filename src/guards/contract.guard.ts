import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const contractGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    if (!localStorage.getItem('contract_number')) {
      router.navigateByUrl('/contract/create-new-contract');
      return false;
    }
  }
  return true;
};
