import { Component, Inject, OnInit } from '@angular/core';
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
export class SignupDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private router: Router
  ) {}

  errorMessage: string | null = null;
  isLoading = false;
  showData: boolean = false;

  register() {
    this.isLoading = true;
    let user: any = null;
    this.authService
      .register(this.data.registerationData)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          user = res.user;
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.user.id);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('phone', res.user.phone);
          localStorage.setItem('commercial_number', res.user.commercial_number);
          localStorage.setItem('address', res.user.address);
          localStorage.setItem('email_verified_at', res.user.email_verified_at);
          this.authService.handleAuth();
          this.authService
            .addCompanyToUser(this.data.companyData, res.user.id)
            .subscribe({
              next: (res) => {
                this.authService.sendVerificationMail(user).subscribe({
                  next: (res) => {
                    this.isLoading = false;

                    this.dialogRef.close();

                    this.router.navigateByUrl('/contract/create-new-contract');
                  },
                  error: (err) => {
                    this.isLoading = false;
                  },
                });
              },
              error: (err) => {
                this.isLoading = false;
                this.errorMessage = 'Connection Error! Please try again later.';
                console.log(this.data.companyData);
              },
            });
        },
        error: (error) => {
          this.isLoading = false;
          if (error.error.errors['email']) {
            this.errorMessage = 'Email is already in use.';
          } else if (error.error.errors['phone']) {
            this.errorMessage = 'Phone is already in use.';
          } else {
            this.errorMessage = error.error.message;
          }
        },
      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showData = true;
    }, 7000);
  }
}
