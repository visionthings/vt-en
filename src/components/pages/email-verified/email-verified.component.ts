import { Component, OnInit } from '@angular/core';
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
    const id = this.route.snapshot.paramMap.get('id');
    this.auth
      .verifyEmail(id)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.message = 'تم تفعيل الحساب بنجاح';
          if (typeof window !== 'undefined') {
            window?.localStorage?.setItem('email_verified', res.email_verified);
          }
        },
        error: (err) => {
          this.message = 'تعذر تفعيل الحساب، يرجى المحاولة مرة أخرى';
        },
      });
  }
}
