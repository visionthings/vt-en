import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../../../../services/payment.service';
import { GetPromocodesService } from '../../../../services/get-promocodes.service';
import { first } from 'rxjs';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
@Injectable({ providedIn: 'root' })
export class PaymentComponent {
  constructor(
    private fb: FormBuilder,
    private payment: PaymentService,
    private getPromocodes: GetPromocodesService
  ) {}

  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Calculate price
  price: number =
    typeof window !== 'undefined' ? Number(localStorage.getItem('price')) : 0;

  vat: number = Number((this.price * 0.15).toFixed(2));

  discount: number = 0;

  totalPrice: number = Number(
    (this.price + this.vat - this.discount).toFixed(2)
  );

  // Discount form

  discountForm = this.fb.group({
    promocode: ['', Validators.required],
  });

  discountResponse: string = '';
  startDate: any = null;
  expiryDate: any = null;
  responseMessage: any = null;

  getDiscount() {
    this.getPromocodes.getPromocodes().subscribe({
      next: (promocodes: any) => {
        const foundPromoCode = promocodes.find(
          (code: any) =>
            code.promocode === this.discountForm.controls['promocode'].value
        );

        if (foundPromoCode) {
          this.startDate = Date.parse(foundPromoCode.start_date);
          this.expiryDate = Date.parse(foundPromoCode.expiry_date);
          const currentDate = new Date();
          if (currentDate < this.expiryDate) {
            this.responseMessage = `تهانينا، لقد حصلت على خصم بقيمة ${foundPromoCode.discount}%`;
            this.discount = foundPromoCode?.discount;
            if (typeof window !== 'undefined') {
              localStorage.setItem('discount', foundPromoCode?.discount);
            }
          } else {
            this.responseMessage = `كوبون الخصم الذي ادخلته منتهى الصلاحية`;
            this.discount = 0;
            if (typeof window !== 'undefined') {
              localStorage.setItem('discount', '0');
            }
          }
        } else {
          this.responseMessage = `كوبون الخصم الذي ادخلته غير صحيح`;
          this.discount = 0;
          if (typeof window !== 'undefined') {
            localStorage.setItem('discount', '0');
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Payment form
  paymentForm = this.fb.group({
    name: ['', Validators.required],
    number: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(14),
      ],
    ],
    cvc: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(3),
        Validators.maxLength(3),
      ],
    ],
    expiry_date: [
      '',
      [
        Validators.required,
        Validators.pattern(/(0[1-9]|1[1,2])\/(19|20)\d{2}/),
      ],
    ],
  });

  get name() {
    return this.paymentForm.controls['name'];
  }
  get number() {
    return this.paymentForm.controls['number'];
  }
  get cvc() {
    return this.paymentForm.controls['cvc'];
  }
  get expiry_date() {
    return this.paymentForm.controls['expiry_date'];
  }

  sendPayment() {
    let paymentData = {
      amount: 100,
      currency: 'SAR',
      description: 'Payment for contract',
      callback_url: 'https://vt.com.sa/contract/payment-redirect',
      on_completed: 'https://vt.com.sa/contract/final-contract',
      source: {
        type: 'creditcard',
        name: this.paymentForm.value.name,
        number: this.paymentForm.value.number,
        cvc: this.paymentForm.value.cvc,
        month: this.paymentForm.value.expiry_date?.slice(0, 2),
        year: this.paymentForm.value.expiry_date?.slice(-2),
      },
    };
    this.payment
      .sendPayment(paymentData)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          if (typeof window !== 'undefined') {
            if (res.source.transaction_url) {
              location.href = res.source.transaction_url;
            }
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
