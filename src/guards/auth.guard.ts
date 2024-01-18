import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  let isAuthenticated;
  auth.isAuthenticated.subscribe({
    next: (res: any) => {
      if (res === true) {
        isAuthenticated = true;
      } else {
        isAuthenticated = false;
      }
    },
  });
  if (isAuthenticated) {
    return true;
  } else {
    router.navigateByUrl('/sign-in');
    return false;
  }
};
