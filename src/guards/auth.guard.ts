import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { first } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('email_verified') === 'yes') {
        return true;
      } else {
        router.navigateByUrl('/email-verification');
        return false;
      }
    } else {
      router.navigateByUrl('/sign-in');
      return false;
    }
  }
  return false;
};
