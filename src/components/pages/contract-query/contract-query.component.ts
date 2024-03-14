import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ContractService } from '../../../services/contract.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-contract-query',
  standalone: true,
  imports: [CommonModule],
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

  ngOnInit(): void {
    this.contractService.getContractDataByNumber(this.id).subscribe({
      next: (res: any) => {
        this.contractData = res;
      },
      error: (err) => {
        this.errorMessage =
          'عفواً، ليس لديك الصلاحية للإطلاع على بيانات هذا العقد.';
      },
    });
  }
}
