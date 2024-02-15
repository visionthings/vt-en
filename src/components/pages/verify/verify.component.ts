import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SmsService } from '../../../services/sms.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css',
})
export class VerifyComponent {
  constructor(
    private fb: FormBuilder,
    private sms: SmsService,
    private router: Router
  ) {}
  phoneForm = this.fb.group({
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

  get phone() {
    return this.phoneForm.controls['phone'];
  }

  getCode() {
    this.sms
      .sendOTP(this.phoneForm.controls.phone.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.hasCode = true;
          this.verification_id = res.verfication_id;
          console.log(res);
        },
        error: (err) => {
          this.hasCode = true;
          console.log(err);
        },
      });
  }

  // Verify code

  hasCode = false;
  verification_id = null;

  verifyForm = this.fb.group({
    code: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
    ],
  });

  get code() {
    return this.verifyForm.controls['code'];
  }

  codeError: null | string = null;
  submit() {
    let data = {
      verification_id: this.verification_id,
      verification_code: this.verifyForm.controls.code.value,
    };
    console.log(data);

    this.sms
      .verifyOTP(data)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (res.status === 'V') {
            let phone: any = this.phoneForm.controls.phone.value;
            window?.localStorage?.setItem('phone', phone);
            this.router.navigateByUrl('/sign-up');
          } else if (res.status === 'F') {
            this.codeError = 'الرمز الذي أدخلته غير صحيح';
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
