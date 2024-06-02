import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { QrCodeModule } from "ng-qrcode";
import { ContractPdfComponent } from "../contract-pdf/contract-pdf.component";
import { ContractService } from "../../../../services/contract.service";
import { first } from "rxjs";
import { InvoiceService } from "../../../../services/invoice.service";
import { GreenButtonComponent } from "../../../../shared/green-button/green-button.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-renewed-contract",
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    QrCodeModule,
    ContractPdfComponent,
    GreenButtonComponent,
  ],
  templateUrl: "./renewed-contract.component.html",
  styleUrl: "./renewed-contract.component.css",
})
export class RenewedContractComponent implements OnInit {
  @ViewChild("contract") contract!: ElementRef;
  constructor(
    private contractService: ContractService,
    private invoiceService: InvoiceService,
    private router: Router
  ) {}

  contract_number: any = null;
  isLoading = true;
  contractData: any = null;

  ngOnInit(): void {
    if (typeof window !== "undefined") {
      this.contract_number = localStorage.getItem("contract_number");
    }
    this.contractService
      .getContractDataByNumber(this.contract_number)
      .subscribe({
        next: (res) => {
          this.contractData = res;
        },
        complete: () => {
          this.isLoading = false;
          let invoiceData = [
            {
              channels: [
                {
                  medium: "email",
                  data: {
                    subject: "فاتورة عقد صيانة كاميرات",
                    message: "فاتورة عقد صيانة كاميرات   ",
                    recipients: { to: [this.contractData.email] },
                  },
                },
              ],
              contact: {
                name: this.contractData.name,
              },
              currency: "SAR",
              language: "ar",
              project: "VT",

              invoice_number: this.contractData.id,
              invoice_date: this.contractData.contract_date,
              line_items: [
                {
                  name: "عقد صيانة كاميرات مراقبة",
                  description: "عقد صيانة لمدة عام ",
                  quantity: 1,
                  discount: {
                    type: "percent",
                    value: this.contractData.discount,
                  },
                  price: this.contractData.price,
                  tax_rate: "tax_X5GRWKNpRjPfMDqWCJBtAV",
                },
              ],
              status: "PAID",
              tax_amount_type: "TAX_INCLUSIVE",
              paid_through_account: "acc_JZrYxV5GsFDWMkfe6QK2HM",
            },
          ];
          if (this.contractData.is_paid == 1) {
            this.invoiceService
              .sendInvoice(invoiceData)
              .pipe(first())
              .subscribe({
                next: (res) => {
                  console.log(res);
                },
                error: (err) => {
                  console.log(err);
                },
              });
          } else {
            this.router.navigateByUrl("/contract/create-new-contract");
          }
        },
      });
    if (typeof window !== "undefined") {
      localStorage.removeItem("contract_number");
    }
  }

  generateContract() {
    let DATA: any = document.getElementById("contract");
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let fileWidth = PDF.internal.pageSize.getWidth();
      let fileHeight = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
      PDF.save("Vision_Things_Contract.pdf");
    });
  }
}
