import {
  Component,
  Injectable,
  OnInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { first } from "rxjs";
import { FinalContractComponent } from "../final-contract/final-contract.component";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ContractPdfComponent } from "../contract-pdf/contract-pdf.component";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { GreenButtonComponent } from "../../../../shared/green-button/green-button.component";
import { ErrorMessageComponent } from "../../../../shared/error-message/error-message.component";
import { ContractService } from "../../../../services/contract.service";

@Component({
  selector: "app-registered-contracts",
  standalone: true,
  imports: [
    CommonModule,
    FinalContractComponent,
    ContractPdfComponent,
    NgOptimizedImage,
    GreenButtonComponent,
    ErrorMessageComponent,
  ],
  templateUrl: "./registered-contracts.component.html",
  styleUrl: "./registered-contracts.component.css",
})
@Injectable({ providedIn: "root" })
export class RegisteredContractsComponent implements OnInit {
  @ViewChild("contract") contract!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    private contractService: ContractService
  ) {}

  errorMessage = null;
  isLoading = true;
  cameraPrices: any = [];
  ngOnInit(): void {
    this.authService
      .getUser(this.userID)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.registeredContracts = res.contracts.filter((contract: any) => {
            return contract.is_paid == 1;
          });
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
        },
      });

    this.contractService.getCamerasPriceList().subscribe({
      next: (res: any) => {
        this.cameraPrices = res;
      },
    });
  }

  // Download contract
  userID = typeof window !== "undefined" && localStorage.getItem("id");
  registeredContracts: any = [];
  currentData = {};
  async setCurrentData(contractID: any) {
    this.currentData = this.registeredContracts.find(
      (contract: any) => contract.id === contractID
    );
  }
  generatePDF() {
    let DATA: any = document.getElementById("contract");
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let width = PDF.internal.pageSize.getWidth();
      let height = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, "PNG", 0, position, width, height);
      PDF.save("Vision_Things_Contract.pdf");
    });
  }
  async generateContract(contractID: any) {
    await this.setCurrentData(contractID).then(() => {
      setTimeout(() => {
        this.generatePDF();
      }, 1000);
    });
  }

  // Renew contract
  price = 0;

  renewContract(contractID: any) {
    let expiredContract = this.registeredContracts.find(
      (contract: any) => contract.id === contractID
    );

    let total_price: any = 0;
    let total_cameras =
      Number(expiredContract.indoor_cameras) +
      Number(expiredContract.outdoor_cameras);

    let defaultPriceRecord = this.cameraPrices.find((p: any) => {
      return p.to == 0;
    });

    let defaultPrice = defaultPriceRecord.price;

    for (let i = 0; i < this.cameraPrices.length; i++) {
      if (
        total_cameras >= this.cameraPrices[i].from &&
        total_cameras <= this.cameraPrices[i].to &&
        this.cameraPrices[i].to != 0
      ) {
        total_price = Number(this.cameraPrices[i].price);
      }
    }
    if (total_price == 0) {
      total_price = (Number(defaultPrice) * total_cameras).toFixed(2);
    }

    this.contractService
      .createContract({
        commercial_number: expiredContract.commercial_number,
        address: expiredContract.address,
        indoor_cameras: expiredContract.indoor_cameras,
        outdoor_cameras: expiredContract.outdoor_cameras,
        storage_device: expiredContract.storage_device,
        period_of_record: expiredContract.period_of_record,
        show_screens: expiredContract.show_screens,
        camera_type: expiredContract.camera_type,
        total_price: total_price,
      })
      .subscribe({
        next: (res: any) => {
          if (typeof window !== "undefined") {
            localStorage.setItem("contract_number", res.id);
            localStorage.setItem("expired_contract_number", expiredContract.id);
          }

          this.router.navigateByUrl("/contract/renew-contract-payment");
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
  }

  // Create new contract
  createNewContract() {
    this.router.navigateByUrl("contract/create-new-contract");
  }
}
