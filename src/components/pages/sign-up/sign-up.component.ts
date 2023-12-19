import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService, User } from '../../../services/auth.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
@Injectable({ providedIn: 'root' })
export class SignUpComponent {
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

  // Sign Up form validation
  signUpForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[\u0621-\u064A\u0660-\u0669 ]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(
          /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
        ),
      ],
    ],
    commercial_number: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    address: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[\u0621-\u064A\u0660-\u0669 ]+$/),
      ],
    ],
  });

  get name() {
    return this.signUpForm.controls['name'];
  }
  get email() {
    return this.signUpForm.controls['email'];
  }
  get password() {
    return this.signUpForm.controls['password'];
  }
  get phone() {
    return this.signUpForm.controls['phone'];
  }
  get commercial_number() {
    return this.signUpForm.controls['commercial_number'];
  }
  get address() {
    return this.signUpForm.controls['address'];
  }

  // Sign Up
  errorMessage: string | null = null;

  signUp(): void {
    this.signUpForm.markAllAsTouched();

    this.authService
      .register(this.signUpForm.value)
      .pipe(first())
      .subscribe({
        next: (res: User) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.user.id);
          localStorage.setItem('name', res.user.name);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('phone', res.user.phone);
          localStorage.setItem('commercial_number', res.user.commercial_number);
          localStorage.setItem('address', res.user.address);

          this.authService.handleAuth();
          this.router.navigateByUrl('/sign-in-redirect');
        },
        error: (error) => {
          console.log(error);

          error.error.message.startsWith(
            'SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry'
          )
            ? (this.errorMessage = `The email you entered is already in use`)
            : (this.errorMessage = `The email or password is incorrect. Please verify the data is correct and try again.`);
        },
      });
  }
}
