import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Update password form validation
  updatePasswordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get password() {
    return this.updatePasswordForm.controls['password'];
  }

  // Update password
  responseMessage: string | null = null;
  errorMessage: string | null = null;

  updatePassword(): void {
    this.updatePasswordForm.markAllAsTouched();

    this.authService.editProfile(this.updatePasswordForm.value).subscribe({
      next: (res: any) => {
        this.responseMessage = `تم تغيير كلمة المرور بنجاح`;
      },
      error: (error) => {
        this.errorMessage = `تعذر الاتصال بقاعدة البيانات، يرجى التحقق من اتصالك بالانترنت والمحاولة مرة أخرى.`;
      },
    });
  }
}
