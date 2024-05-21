import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css',
})
export class EmailVerificationComponent {
  constructor(private authService: AuthService) {}

  message: string | null = null;

  resendVerificationMail() {
    if (typeof window !== 'undefined') {
      const user = {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        phone: localStorage.getItem('phone'),
        commercial_number: localStorage.getItem('commercial_number'),
        address: localStorage.getItem('address'),
        email_verified: localStorage.getItem('email_verified'),
      };
      this.authService.sendVerificationMail(user).subscribe({
        next: (res) => {
          this.message = 'تم إعادة إرسال رمز التفعيل بنجاح.';
          setTimeout(() => {
            this.message = null;
          }, 5000);
        },
        error: (err) => {
          this.message =
            'تعذر إعادة إرسال رمز التفعيل، يرجى المحاولة مرة أخرى، إذا استمرت المشكلة يرجى الاتصال بنا.';
        },
      });
    }
  }
}
