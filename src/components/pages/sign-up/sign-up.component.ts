import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import {
  emailConfirmValidator,
  passwordConfirmValidator,
} from '../../../shared/validators';
import { MatDialog } from '@angular/material/dialog';
import { SignupDialogComponent } from '../../../shared/signup-dialog/signup-dialog.component';
import { SignupErrorDialogComponent } from '../../../shared/signup-error-dialog/signup-error-dialog.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SignupDialogComponent,
    SignupErrorDialogComponent,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
@Injectable({ providedIn: 'root' })
export class SignUpComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  errorMessage: string | null = null;

  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Sign Up form validation
  signUpForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[\u0621-\u064A\u0660-\u0669 ]+$/),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
        ),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    email_confirm: ['', [Validators.required, emailConfirmValidator]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirm: ['', [Validators.required, passwordConfirmValidator]],
    commercial_number: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ],
    ],
    agree: [''],
    recaptchaReactive: ['', Validators.required],
  });

  get name() {
    return this.signUpForm.controls['name'];
  }
  get phone() {
    return this.signUpForm.controls['phone'];
  }
  get email() {
    return this.signUpForm.controls['email'];
  }
  get email_confirm() {
    return this.signUpForm.controls['email_confirm'];
  }
  get password() {
    return this.signUpForm.controls['password'];
  }
  get password_confirm() {
    return this.signUpForm.controls['password_confirm'];
  }
  get commercial_number() {
    return this.signUpForm.controls['commercial_number'];
  }
  get agree() {
    return this.signUpForm.controls['agree'];
  }
  get recaptchaReactive() {
    return this.signUpForm.controls['recaptchaReactive'];
  }

  // Sign Up

  signupLoading = false;
  showAgreeError = false;

  signUp(): void {
    this.signupLoading = true;
    this.showAgreeError = false;

    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.controls['agree'].value == false) {
      this.signupLoading = false;
      this.showAgreeError = true;
    } else {
      let companyName, address;
      let registerationData: any = this.signUpForm.value;
      registerationData.email_verified = 'no';
      this.authService
        .getCompanyData(this.signUpForm.controls['commercial_number'].value)
        .subscribe({
          next: (res: any) => {
            companyName = res.crName;
            address = res.address.national;
            if (
              companyName === null ||
              address.buildingNumber === null ||
              address.streetName === null ||
              address.districtName === null ||
              address.city === null
            ) {
              let user: any = null;
              this.authService.register(registerationData).subscribe({
                next: (res: any) => {
                  this.signupLoading = false;

                  user = res.user;
                  localStorage.setItem('token', res.token);
                  localStorage.setItem(
                    'email_verified_at',
                    res.user.email_verified_at
                  );
                  localStorage.setItem('id', res.user.id);
                  localStorage.setItem('name', res.user.name);
                  localStorage.setItem('email', res.user.email);
                  localStorage.setItem('phone', res.user.phone);
                  localStorage.setItem(
                    'commercial_number',
                    this.signUpForm.controls['commercial_number'].value
                  );
                  localStorage.setItem('address', res.user.address);

                  this.authService.handleAuth();
                  this.router.navigateByUrl('/company-information');
                },
                error: (error) => {
                  this.signupLoading = false;

                  this.errorMessage = error.error.message;
                },
              });
            } else {
              this.signupLoading = false;

              const dialogRef = this.dialog.open(SignupDialogComponent, {
                data: {
                  messages: [
                    'بناء على البيانات التي أدخلتها هذه هي بيانات شركتك:',
                    `اسم الشركة: ${companyName}`,
                    `العنوان: ${address.buildingNumber} ${address.streetName} - حي ${address.districtName} - مدينة ${address.city}`,
                    'للتأكيد اضغط استمرار',
                  ],
                  registerationData: registerationData,
                  companyData: {
                    commercial_number:
                      this.signUpForm.controls['commercial_number'].value,
                    company_name: companyName,
                    company_type: res.businessType.name,
                    building_number: res.address.national.buildingNumber,
                    street: res.address.national.streetName,
                    district: res.address.national.districtName,
                    city: res.address.national.city,
                  },
                },
              });
            }
          },
          error: () => {
            this.signupLoading = false;

            const dialogRef = this.dialog.open(SignupErrorDialogComponent, {
              data: { messages: ['رقم السجل التجاري غير صحيح.'] },
            });
          },
        });
    }
  }
}
