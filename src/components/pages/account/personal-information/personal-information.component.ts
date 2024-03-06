import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-personal-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css',
})
export class PersonalInformationComponent {
  constructor(private fb: FormBuilder, private authService: AuthService) {}
  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Sign Up form validation
  editProfileForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[\u0621-\u064A\u0660-\u0669 ]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
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
  });

  get name() {
    return this.editProfileForm.controls['name'];
  }
  get email() {
    return this.editProfileForm.controls['email'];
  }

  get phone() {
    return this.editProfileForm.controls['phone'];
  }

  x = 'd';
  // Edit profile
  responseMessage: string | null = null;
  errorMessage: string | null = null;

  editProfile(): void {
    this.editProfileForm.markAllAsTouched();

    this.authService.editProfile(this.editProfileForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('name', res.name);
        localStorage.setItem('email', res.email);
        localStorage.setItem('phone', res.phone);
        localStorage.setItem('commercial_number', res.commercial_number);
        localStorage.setItem('address', res.address);

        this.responseMessage = `تم تعديل البيانات بنجاح`;
      },
      error: (error) => {
        console.log(this.editProfileForm.value);
        this.errorMessage = `تعذر الاتصال بقاعدة البيانات، يرجى التحقق من اتصالك بالانترنت والمحاولة مرة أخرى.`;
      },
    });
  }
}
