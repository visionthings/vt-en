import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmsService } from '../../services/sms.service';
import { first } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  constructor(private sms: SmsService, private fb: FormBuilder) {}

  smsForm = this.fb.group({
    mobile: [''],
  });

  get mobile() {
    return this.smsForm.controls['mobile'];
  }
  data: any = {
    api_id: 'API94645066018',
    api_password: 'tmGeSwL5SA',
    sender_id: 'vt.com.sa',
    brand: 'Vision Things',
    phonenumber: this.smsForm.controls.mobile.value,
  };

  response = false;
  error = false;
  endpoint = '';
  verification_id = null;

  sendOTP() {
    this.sms
      .sendOTP(this.smsForm.controls.mobile.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.verification_id = res.verification_id;
          console.log(res);
        },
        error: (err) => {
          this.error = true;
          this.endpoint = err.url;
          console.log(err);
        },
      });
  }

  // Verifiy form

  verifyForm = this.fb.group({
    code: [''],
  });
  get code() {
    return this.verifyForm.controls.code.value;
  }

  verifyOtp() {
    this.sms
      .verifyOTP({
        verification_id: this.verification_id,
        code: this.code,
      })
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
