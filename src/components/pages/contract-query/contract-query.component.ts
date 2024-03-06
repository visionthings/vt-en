import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ContractService } from '../../../services/contract.service';

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
  isValid: boolean | undefined = undefined;

  ngOnInit(): void {
    this.contractService.getContractDataByNumber(this.id).subscribe({
      next: (res: any) => {
        console.log(res);

        this.contractData = res[0];
      },
    });
  }
}
