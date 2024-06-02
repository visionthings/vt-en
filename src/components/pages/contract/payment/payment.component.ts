import { Component, Injectable, OnInit } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ReactiveFormsModule, Validators, FormBuilder } from "@angular/forms";
import { PaymentService } from "../../../../services/payment.service";
import { GetPromocodesService } from "../../../../services/get-promocodes.service";
import { first } from "rxjs";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { ContractService } from "../../../../services/contract.service";
import { ErrorMessageComponent } from "../../../../shared/error-message/error-message.component";

@Component({
  selector: "app-payment",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgxMaskDirective,
    ErrorMessageComponent,
  ],
  providers: [provideNgxMask()],
  templateUrl: "./payment.component.html",
  styleUrl: "./payment.component.css",
})
@Injectable({ providedIn: "root" })
export class PaymentComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private payment: PaymentService,
    private getPromocodes: GetPromocodesService,
    private contractService: ContractService
  ) {}
  isLoading = true;

  ngOnInit(): void {
    let contract_number;
    if (typeof window !== "undefined") {
      contract_number = localStorage.getItem("contract_number");
    }
    this.contractService.getContractDataByNumber(contract_number).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.contract = res;
        this.price = Number(this.contract.price).toFixed(2);
        this.vat = Number(this.contract.vat).toFixed(2);
        this.discount = Number(this.contract.discount).toFixed(2);
        this.totalPrice = Number(this.contract.total_price).toFixed(2);
      },
    });
  }
  contract: any = null;
  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  // Calculate price

  vat: any = 0;

  price: any = 0;

  discount: any = 0;

  totalPrice: any = 0;

  // Discount form

  discountForm = this.fb.group({
    promocode: ["", Validators.required],
  });

  discountResponse: string = "";
  startDate: any = null;
  expiryDate: any = null;
  responseMessage: any = null;

  getDiscount() {
    this.getPromocodes.getPromocodes().subscribe({
      next: (promocodes: any) => {
        const foundPromoCode = promocodes.find(
          (code: any) =>
            code.promocode === this.discountForm.controls["promocode"].value
        );

        if (foundPromoCode) {
          this.startDate = Date.parse(foundPromoCode.start_date);
          this.expiryDate = Date.parse(foundPromoCode.expiry_date);
          const currentDate = new Date();
          if (currentDate < this.expiryDate) {
            this.responseMessage = `           Congratulations! You've got ${foundPromoCode.discount}% discount`;
            this.discount = foundPromoCode?.discount;
            this.contractService
              .applyDiscount({
                contract_number: this.contract.id,
                discount: foundPromoCode?.discount,
              })
              .subscribe({
                next: (res: any) => {
                  this.discount = Number(res.discount).toFixed(2);
                  this.vat = Number(res.vat).toFixed(2);
                  this.totalPrice = Number(res.total_price).toFixed(2);
                },
                error: (error) => {
                  this.errorMessage = error.error.message;
                },
              });
          } else {
            this.responseMessage = `Promocode is expired`;
            this.discount = 0;
            if (typeof window !== "undefined") {
              localStorage.setItem("discount", "0");
            }
          }
        } else {
          this.responseMessage = `Promocode NOT Valid`;
          this.discount = 0;
          if (typeof window !== "undefined") {
            localStorage.setItem("discount", "0");
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
    expiry_date: ["", [Validators.required]],
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
      amount: this.totalPrice * 100,
      currency: "SAR",
      description: "Payment for contract",
      callback_url: "https://vt.com.sa/contract/payment-redirect",
      on_completed: "https://vt.com.sa/contract/final-contract",
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
      .pipe(first())
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
