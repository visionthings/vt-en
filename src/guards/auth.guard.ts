import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { first } from 'rxjs';

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
    const userID = window?.localStorage?.getItem('id');
    auth
      .getUser(userID)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (res.email_verified === 'yes') {
            return true;
          } else {
            router.navigateByUrl('/email-verification');
            return false;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    return true;
  } else {
    router.navigateByUrl('/sign-in');
    return false;
  }
};
