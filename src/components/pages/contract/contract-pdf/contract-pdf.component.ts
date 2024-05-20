import {
  Component,
  ViewChild,
  ElementRef,
  OnChanges,
  AfterViewInit,
  Input,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QrCodeModule } from 'ng-qrcode';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-contract-pdf',
  standalone: true,
  imports: [CommonModule, QrCodeModule],
  templateUrl: './contract-pdf.component.html',
  styleUrl: './contract-pdf.component.css',
})
export class ContractPdfComponent implements OnChanges {
  @Input() data: any = {};
  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes['data'].currentValue;
  }
  calcCamerasCount(indoor_cameras: any, outdoor_cameras: any) {
    return Number(indoor_cameras) + Number(outdoor_cameras);
  }
  contractNumber: any = window?.localStorage?.getItem('contract_number');
  endpoint = environment.url;
  url = `https://vt.com.sa/contract-query/${this.contractNumber}`;
}
