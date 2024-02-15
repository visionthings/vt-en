import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';
import { first } from 'rxjs';
import { ContractService } from '../../../../services/contract.service';

@Component({
  selector: 'app-payment-redirect',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-redirect.component.html',
  styleUrl: './payment-redirect.component.css',
})
@Injectable({ providedIn: 'root' })
export class PaymentRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contract: ContractService
  ) {}

  message = '';
  url = '';
  img = '';
  ngOnInit(): void {
    this.route.queryParamMap.pipe(first()).subscribe({
      next: (res: any) => {
        if (res.params.message === 'APPROVED' && res.params.status === 'paid') {
          this.message = `عملية الدفع تمت بنجاح وجاري تحويلك الآن لصفحة تحميل العقد`;
          this.url = '/contract/final-contract';
          this.img = 'success';
          this.contract
            .getContractNumber()
            .pipe(first())
            .subscribe({
              next: (res: any) => {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('contract_number', res);
                }
              },
            });
          setTimeout(() => {
            this.router.navigateByUrl('/contract/final-contract');
          }, 3000);
        } else {
          this.message = `تعذر اتمام عملية السداد، جاري تحويلك لصفحة الدفع مرة أخرى`;
          this.url = '/contract/payment';
          this.img = 'failed';
          setTimeout(() => {
            this.router.navigateByUrl('/contract/payment');
          }, 3000);
        }
      },
    });
  }
}
