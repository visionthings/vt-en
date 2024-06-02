import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-email-verified',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-verified.component.html',
  styleUrl: './email-verified.component.css',
})
export class EmailVerifiedComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}

  message = '';

  ngOnInit(): void {
    let id, token;
    this.route.queryParamMap.pipe(first()).subscribe({
      next: (res: any) => {
        (id = res.params.id), (token = res.params.token);
      },
    });

    this.auth
      .verifyEmail(id, token)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.message = 'Your account has been activated successfully.';
          if (typeof window !== 'undefined') {
            window?.localStorage?.setItem(
              'email_verified_at',
              res.email_verified_at
            );
          }

          setTimeout(() => {
            this.router.navigateByUrl('/contract/create-new-contract');
          }, 5000);
        },
        error: (err) => {
          this.message = 'Failed to activate account.';
        },
      });
  }
}
