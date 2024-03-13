import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GreenButtonComponent } from '../../../custom/green-button/green-button.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QrCodeModule } from 'ng-qrcode';
import { ContractPdfComponent } from '../contract-pdf/contract-pdf.component';
import { ContractService } from '../../../../services/contract.service';
import { first } from 'rxjs';
import { InvoiceService } from '../../../../services/invoice.service';

@Component({
  selector: 'app-final-contract',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    GreenButtonComponent,
    QrCodeModule,
    ContractPdfComponent,
  ],
  templateUrl: './final-contract.component.html',
  styleUrl: './final-contract.component.css',
})
export class FinalContractComponent implements OnInit {
  @ViewChild('contract') contract!: ElementRef;
  constructor(
    private contractService: ContractService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.contractService
      .createContract(this.data)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });

    this.invoiceService
      .sendInvoice(this.invoiceData)
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

  // Contract Data
  date = new Date();

  currentDate = `${this.date.getFullYear()}-${
    this.date.getMonth() + 1
  }-${this.date.getDate()}`;

  newExpiryYear = new Date();
  expiryYear: any = this.newExpiryYear.setFullYear(
    this.newExpiryYear.getFullYear() + 1
  );

  expiryDate = `${this.date.getDate()} / ${
    this.date.getMonth() + 1
  } / ${this.newExpiryYear.getFullYear()} `;

  data: any = {
    user_id:
      typeof window !== 'undefined' && window?.localStorage?.getItem('id'),
    name:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('company_name'),
    phone:
      typeof window !== 'undefined' && window?.localStorage?.getItem('phone'),
    email:
      typeof window !== 'undefined' && window?.localStorage?.getItem('email'),
    commercial_number:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('commercial_number'),
    address:
      typeof window !== 'undefined' && window?.localStorage?.getItem('address'),

    indoor_cameras:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('indoor_cameras'),
    outdoor_cameras:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('outdoor_cameras'),
    storage_device:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('storage_device'),
    period_of_record:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('period_of_record'),
    show_screens:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('show_screens'),
    camera_type:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('camera_type'),
    total_cameras:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('total_cameras'),
    contract_date: this.currentDate,
    expiry_date: this.expiryDate,
    contract_number:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('contract_number'),
    price:
      typeof window !== 'undefined' && window?.localStorage?.getItem('price'),
    vat: typeof window !== 'undefined' && window?.localStorage?.getItem('vat'),
    total_price:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('total_price'),
    discount:
      typeof window !== 'undefined' &&
      window?.localStorage?.getItem('discount'),
  };

  generateContract() {
    let DATA: any = document.getElementById('contract');
    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let fileWidth = PDF.internal.pageSize.getWidth();
      let fileHeight = PDF.internal.pageSize.getHeight();
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Vision_Things_Contract.pdf');
    });
  }

  // Invoice data
  invoiceData = [
    {
      channels: [
        {
          medium: 'email',
          data: {
            subject: 'فاتورة عقد كاميرات رؤية الأشياء',
            message: 'فاتورة عقد كاميرات رؤية الأشياء',
            recipients: { to: [this.data.email] },
          },
        },
      ],
      contact: {
        name: this.data.name,
      },
      currency: 'SAR',
      language: 'ar',
      tax_amount_type: 'TAX_EXCLUSIVE',
      invoice_number: this.data.contract_number,
      invoice_date: this.data.contract_date,
      line_items: [
        {
          name: 'عقد صيانة كاميرات مراقبة',
          description: '',
          quantity: 1,
          price: this.data.price - this.data.discount,
          tax_rate: 'tax_X5GRWKNpRjPfMDqWCJBtAV',
        },
      ],
    },
  ];
}
