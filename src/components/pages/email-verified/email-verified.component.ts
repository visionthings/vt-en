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

  id = this.route.snapshot.paramMap.get('id');
  message = '';

  ngOnInit(): void {
    this.auth
      .verifyEmail(this.id)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.message =
            'تم تفعيل حسابك بنجاح، وجاري تحويلك الآن لصفحة إنشاء العقد.';
          if (typeof window !== 'undefined') {
            window?.localStorage?.setItem('email_verified', res.email_verified);
          }

          setTimeout(() => {
            this.router.navigateByUrl('/contract/create-new-contract');
          }, 5000);
        },
        error: (err) => {
          this.message = 'تعذر تفعيل الحساب، يرجى المحاولة مرة أخرى';
        },
      });
  }
}
