import { Component, Injectable, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { RouterLink, Router } from "@angular/router";
import { first } from "rxjs";
import { ContractService } from "../../../../services/contract.service";

@Component({
  selector: "app-payment-redirect",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./payment-redirect.component.html",
  styleUrl: "./payment-redirect.component.css",
})
@Injectable({ providedIn: "root" })
export class PaymentRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractService
  ) {}

  message = "";
  url = "";
  img = "";
  ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe({
      next: (res: any) => {
        if (res.params.message === "APPROVED" && res.params.status === "paid") {
          this.message = "Payment done successfully";
          this.url = "/contract/final-contract";
          this.img = "success";
          let contract_number;
          if (typeof window !== "undefined") {
            contract_number = localStorage.getItem("contract_number");
          }
          this.contractService
            .applyPayment({ contract_number: contract_number })
            .subscribe({
              next: () => {
                setTimeout(() => {
                  this.router.navigateByUrl("/contract/final-contract");
                }, 3000);
              },
            });
        } else {
          this.message = "Payment Failed";
          this.url = "/contract/payment";
          this.img = "failed";
          setTimeout(() => {
            this.router.navigateByUrl("/contract/payment");
          }, 3000);
        }
      },
    });
  }
}
