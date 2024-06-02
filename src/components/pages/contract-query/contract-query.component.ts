import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-contract-query',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './contract-query.component.html',
  styleUrl: './contract-query.component.css',
})
export class ContractQueryComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private contractService: ContractService
  ) {}
  id = this.route.snapshot.paramMap.get('id');
  contractData: any = undefined;
  errorMessage: undefined | string = undefined;
  isValid: boolean | undefined = undefined;
  totalCameras = 0;
  isLoading = true;
  ngOnInit(): void {
    this.contractService.getContractDataByNumber(this.id).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.contractData = res;
        this.totalCameras =
          Number(res.indoor_cameras) + Number(res.outdoor_cameras);
        const expiry_date = res.expiry_date;
        const expiry_day = expiry_date.slice(0, 2);
        const expiry_month = expiry_date.slice(4, 7);
        const expiry_year = expiry_date.slice(9, 13);

        if (new Date(expiry_year, expiry_month - 1, expiry_day) < new Date()) {
          this.isValid = true;
        } else {
          this.isValid = false;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
