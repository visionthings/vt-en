import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContractService } from '../../../../services/contract.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-visit-payment-redirect',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './visit-payment-redirect.component.html',
  styleUrl: './visit-payment-redirect.component.css',
})
export class VisitPaymentRedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contract: ContractService
  ) {}

  message = '';
  url = '';
  img = '';
  ngOnInit(): void {
    this.route.queryParamMap.pipe().subscribe({
      next: (res: any) => {
        if (res.params.message === 'APPROVED' && res.params.status === 'paid') {
          this.message = `عملية الدفع تمت بنجاح`;
          this.url = '/contract/visit-complete';
          this.img = 'success';

          setTimeout(() => {
            this.router.navigateByUrl('/contract/visit-complete');
          }, 3000);
        } else {
          this.message = `تعذر اتمام عملية السداد، جاري تحويلك لصفحة الدفع مرة أخرى`;
          this.url = '/contract/payment';
          this.img = 'failed';
          setTimeout(() => {
            this.router.navigateByUrl('/contract/visit-payment');
          }, 3000);
        }
      },
    });
  }
}
