import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  showPasswordForm: boolean = false;
  // Email Form
  emailForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  });

  get email() {
    return this.emailForm.controls['email'];
  }

  errorMessage: string | null = null;

  submitEmail() {
    this.emailForm.markAllAsTouched();
    this.authService
      .resetPassword(this.emailForm.controls['email'].value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.showPasswordForm = true;
          console.log('res');
        },
        error: (err) => {
          this.errorMessage =
            'البريد الإلكتروني غير مسجل لدينا، من فضلك تحقق من صحة البريد الإلكتروني وأعد المحاولة.';
        },
      });
  }
}
