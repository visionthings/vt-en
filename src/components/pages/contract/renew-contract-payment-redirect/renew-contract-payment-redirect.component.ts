import { Component, Injectable, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { RouterLink, Router } from "@angular/router";
import { first } from "rxjs";
import { ContractService } from "../../../../services/contract.service";

@Component({
  selector: "app-renew-contract-payment-redirect",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./renew-contract-payment-redirect.component.html",
  styleUrl: "./renew-contract-payment-redirect.component.css",
})
@Injectable({ providedIn: "root" })
export class RenewContractPaymentRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contract: ContractService
  ) {}

  message = "";
  url = "";
  img = "";
  ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe({
      next: (res: any) => {
        if (res.params.message === "APPROVED" && res.params.status === "paid") {
          this.message = "Payment done successfully";
          this.url = "/contract/renewed-contract";
          this.img = "success";
          this.contract.renewContract().subscribe({
            next: () => {
              setTimeout(() => {
                this.router.navigateByUrl("/contract/renewed-contract");
              }, 3000);
            },
          });
        } else {
          this.message = "Payment Failed!";
          this.url = "/contract/renew-contract-payment";
          this.img = "failed";
          setTimeout(() => {
            this.router.navigateByUrl("/contract/renew-contract-payment");
          }, 3000);
        }
      },
    });
  }
}
