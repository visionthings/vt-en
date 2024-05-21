import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-information',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-information.component.html',
  styleUrl: './company-information.component.css',
})
export class CompanyInformationComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  companyInformationForm = this.fb.group({
    company_name: ['', [Validators.required]],
    company_type: ['', [Validators.required]],
    building_number: ['', [Validators.required]],
    street: ['', [Validators.required]],
    district: ['', [Validators.required]],
    city: ['', [Validators.required]],
  });

  get company_name() {
    return this.companyInformationForm.controls['company_name'];
  }
  get company_type() {
    return this.companyInformationForm.controls['company_type'];
  }
  get building_number() {
    return this.companyInformationForm.controls['building_number'];
  }
  get street() {
    return this.companyInformationForm.controls['street'];
  }
  get district() {
    return this.companyInformationForm.controls['district'];
  }
  get city() {
    return this.companyInformationForm.controls['city'];
  }

  submit() {
    this.companyInformationForm.markAllAsTouched();
    let companyData: any = this.companyInformationForm.value;

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
      let commercial_number = localStorage.getItem('commercial_number');
      companyData.commercial_number = commercial_number;
      this.authService.addCompanyToUser(companyData, user.id).subscribe({
        next: (res) => {
          this.authService.sendVerificationMail(user).subscribe({
            next: (res) => {
              this.router.navigateByUrl('/email-verification');
            },
            error: (err) => {
              console.log(err);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
