import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-signup-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogActions, MatDialogClose, RouterLink],
  templateUrl: './signup-dialog.component.html',
  styleUrl: './signup-dialog.component.css',
})
export class SignupDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private router: Router
  ) {}

  errorMessage: string | null = null;

  register() {
    let user: any = null;
    this.authService
      .register(this.data.registerationData)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          user = res.user;
          localStorage.setItem('token', res.token);
          localStorage.setItem('email_verified', 'no');
          localStorage.setItem('id', res.user.id);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('phone', res.user.phone);
          localStorage.setItem('commercial_number', res.user.commercial_number);
          localStorage.setItem('address', res.user.address);
          localStorage.setItem('email_verified', res.user.email_verified);
          this.authService.handleAuth();
          this.authService
            .addCompanyToUser(this.data.companyData, res.user.id)
            .subscribe({
              next: (res) => {
                this.authService.sendVerificationMail(user).subscribe({
                  next: (res) => {
                    this.dialogRef.close();

                    this.router.navigateByUrl('/email-verification');
                  },
                  error: (err) => {
                    console.log(err);
                  },
                });
              },
              error: (err) => {
                this.errorMessage = 'خطأ فى الاتصال، يرجى المحاولة مرة أخرى';
                console.log(err);
                console.log(this.data.companyData);
              },
            });
        },
        error: (error) => {
          console.log(error);
          error.error.message === 'The email has already been taken.' &&
            (this.errorMessage = `البريد الالكتروني الذي ادخلته مستخدم بالفعل`);
        },
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
