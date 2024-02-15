import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService, User } from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
@Injectable({ providedIn: 'root' })
export class SignInComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Sign In form validation
  signInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.signInForm.controls['email'];
  }
  get password() {
    return this.signInForm.controls['password'];
  }

  errorMessage: string | null = null;

  signIn(): void {
    this.signInForm.markAllAsTouched();

    this.authService.signIn(this.signInForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('id', res.user.id);
        localStorage.setItem('name', res.user.name);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('password', res.user.password);
        localStorage.setItem('phone', res.user.phone);
        localStorage.setItem('commercial_number', res.user.commercial_number);
        localStorage.setItem('address', res.user.address);
        localStorage.setItem('email_verified', res.user.email_verified);

        this.authService.handleAuth();
        this.router.navigateByUrl('/sign-in-redirect');
      },
      error: (error) => {
        this.errorMessage = `البريد الالكتروني أو كلمة المرور غير صحيحة، برجاء التحقق من صحة البيانات والمحاولة مرة أخرى.`;
      },
    });
  }
}
