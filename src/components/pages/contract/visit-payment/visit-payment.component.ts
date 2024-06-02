import { Component } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { PaymentService } from "../../../../services/payment.service";
import { GetPromocodesService } from "../../../../services/get-promocodes.service";

@Component({
  selector: "app-visit-payment",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgOptimizedImage],
  templateUrl: "./visit-payment.component.html",
  styleUrl: "./visit-payment.component.css",
})
export class VisitPaymentComponent {
  constructor(private fb: FormBuilder, private payment: PaymentService) {}

  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Payment form
  paymentForm = this.fb.group({
    name: ["", Validators.required],
    number: [
      "",
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(14),
      ],
    ],
    cvc: [
      "",
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.minLength(3),
        Validators.maxLength(3),
      ],
    ],
    expiry_date: [
      "",
      [
        Validators.required,
        Validators.pattern(/(0[1-9]|1[1,2])\/(19|20)\d{2}/),
      ],
    ],
  });

  get name() {
    return this.paymentForm.controls["name"];
  }
  get number() {
    return this.paymentForm.controls["number"];
  }
  get cvc() {
    return this.paymentForm.controls["cvc"];
  }
  get expiry_date() {
    return this.paymentForm.controls["expiry_date"];
  }

  sendPayment() {
    let paymentData = {
      amount: 75000,
      currency: "SAR",
      description: "Payment for contract",
      callback_url: "https://vt.com.sa/contract/visit-payment-redirect",
      on_completed: "https://vt.com.sa/contract/visit-request-complete",
      source: {
        type: "creditcard",
        name: this.paymentForm.value.name,
        number: this.paymentForm.value.number,
        cvc: this.paymentForm.value.cvc,
        month: this.paymentForm.value.expiry_date?.slice(0, 2),
        year: this.paymentForm.value.expiry_date?.slice(-2),
      },
    };
    this.payment
      .sendPayment(paymentData)
      .pipe()
      .subscribe({
        next: (res: any) => {
          if (res.status == "failed") {
            this.errorMessage = `${res.status} - ${res.source.message}`;
          } else {
            if (typeof window !== "undefined") {
              if (res.source.transaction_url) {
                location.href = res.source.transaction_url;
              }
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
    "assets/images/payment_gateways/visa.png",
    "assets/images/payment_gateways/MasterCard_Logo.svg.png",
    "assets/images/payment_gateways/amex.png",
    "assets/images/payment_gateways/mada.jpg",
  ];
}
