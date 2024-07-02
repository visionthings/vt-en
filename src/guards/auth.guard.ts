import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      router.navigateByUrl('/sign-up');
      return false;
    }
  }
  return false;
};
