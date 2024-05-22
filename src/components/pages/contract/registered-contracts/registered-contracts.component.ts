import {
  Component,
  Injectable,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { first } from 'rxjs';
import { FinalContractComponent } from '../final-contract/final-contract.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ContractPdfComponent } from '../contract-pdf/contract-pdf.component';
import { GreenButtonComponent } from '../../../custom/green-button/green-button.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-registered-contracts',
  standalone: true,
  imports: [
    CommonModule,
    FinalContractComponent,
    ContractPdfComponent,
    GreenButtonComponent,
    NgOptimizedImage,
  ],
  templateUrl: './registered-contracts.component.html',
  styleUrl: './registered-contracts.component.css',
})
@Injectable({ providedIn: 'root' })
export class RegisteredContractsComponent implements OnInit {
  @ViewChild('contract') contract!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService
      .getUser(this.userID)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.registeredContracts = res.contracts;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Download contract
  userID = typeof window !== 'undefined' && localStorage.getItem('id');
  registeredContracts: any = [];
  currentData = {};
  async setCurrentData(contractID: any) {
    this.currentData = this.registeredContracts.find(
      (contract: any) => contract.id === contractID
    );
  }
  generatePDF() {
    let DATA: any = document.getElementById('contract');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let width = PDF.internal.pageSize.getWidth();
      let height = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, width, height);
      PDF.save('Vision_Things_Contract.pdf');
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
  calcPrice(indoor_cameras: any, outdoor_cameras: any) {
    let camerasCount = Number(indoor_cameras) + Number(outdoor_cameras);
    if (!isNaN(camerasCount)) {
      if (camerasCount === 0) {
        if (camerasCount === 0) {
          this.price = 0;
        } else if (camerasCount > 0 && camerasCount <= 4) {
          this.price = 499;
        } else if (camerasCount > 4 && camerasCount <= 16) {
          this.price = 999;
        } else if (camerasCount > 16 && camerasCount <= 32) {
          this.price = 1499;
        } else if (camerasCount > 32 && camerasCount <= 64) {
          this.price = 1999;
        } else this.price = camerasCount * 50;
      } else this.price = 0;
    }
  }

  renewContract(contractID: any) {
    let currentContract = this.registeredContracts.find(
      (contract: any) => contract.id === contractID
    );
    this.calcPrice(
      currentContract.indoor_cameras,
      currentContract.outdoor_cameras
    );

    if (typeof window !== 'undefined') {
      localStorage.setItem('indoor_cameras', currentContract.indoor_cameras);
      localStorage.setItem('outdoor_cameras', currentContract.outdoor_cameras);
      localStorage.setItem('show_screens', currentContract.show_screens);
      localStorage.setItem('storage_device', currentContract.storage_device);
      localStorage.setItem(
        'period_of_record',
        currentContract.period_of_record
      );
      localStorage.setItem('camera_type', currentContract.camera_type);
      localStorage.setItem(
        'total_cameras',
        (
          Number(currentContract.indoor_cameras) +
          Number(currentContract.outdoor_cameras)
        ).toString()
      );
      localStorage.setItem('discount', '0');
      localStorage.setItem('price', currentContract.price);
      localStorage.setItem('contract_number', currentContract.contract_number);
    }
    this.router.navigateByUrl('/contract/renew-contract-payment');
  }

  // Create new contract
  createNewContract() {
    this.router.navigateByUrl('contract/create-new-contract');
  }
}
