import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs';
import { passwordConfirmValidator } from '../../../shared/validators';

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
    this.errorMessage = null;
    if (typeof window !== null && this.emailForm.controls['email'].value) {
      localStorage.setItem('email', this.emailForm.controls['email'].value);
    }
    this.authService
      .resetPassword(this.emailForm.controls['email'].value)
      .pipe(first())
      .subscribe({
        next: (res) => {
          this.showPasswordForm = true;
        },
        error: (err) => {
          this.errorMessage =
            'البريد الإلكتروني غير مسجل لدينا، من فضلك تحقق من صحة البريد الإلكتروني وأعد المحاولة.';
        },
      });
  }

  // Password Form
  passwordForm = this.fb.group({
    token: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirm: ['', [Validators.required, passwordConfirmValidator]],
  });

  get token() {
    return this.passwordForm.controls['token'];
  }
  get password() {
    return this.passwordForm.controls['password'];
  }
  get password_confirm() {
    return this.passwordForm.controls['password_confirm'];
  }

  submitPassword() {
    this.passwordForm.markAllAsTouched();
  }
}
