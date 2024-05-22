import { Component, Injectable } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { PaymentService } from '../../../../services/payment.service';
import { GetPromocodesService } from '../../../../services/get-promocodes.service';
import { first } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-renew-contract-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './renew-contract-payment.component.html',
  styleUrl: './renew-contract-payment.component.css',
})
@Injectable({ providedIn: 'root' })
export class RenewContractPaymentComponent {
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
  priceWithVAT: number =
    typeof window !== 'undefined' ? Number(localStorage.getItem('price')) : 0;

  vat: number = Number((this.priceWithVAT * 0.15).toFixed(2));

  price = this.priceWithVAT - this.vat;

  discount: number = 0;

  totalPrice: number = Number((this.priceWithVAT - this.discount).toFixed(2));

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
            this.totalPrice = Number(
              (
                this.priceWithVAT -
                (this.priceWithVAT * this.discount) / 100
              ).toFixed(2)
            );

            if (typeof window !== 'undefined') {
              localStorage.setItem('total_price', this.totalPrice.toString());
            }

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
    expiry_date: ['', [Validators.required]],
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
      amount: this.totalPrice * 100,
      currency: 'SAR',
      description: 'Payment for contract',
      callback_url:
        'https://vt.com.sa/contract/renew-contract-payment-redirect',
      on_completed: 'https://vt.com.sa/contract/renewed-contract',
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
          this.errorMessage = err.error.message;
        },
      });
  }
  errorMessage: string | null = null;

  paymentGateways = [
    'assets/images/payment_gateways/visa.png',
    'assets/images/payment_gateways/MasterCard_Logo.svg.png',
    'assets/images/payment_gateways/amex.png',
    'assets/images/payment_gateways/mada.jpg',
  ];
}