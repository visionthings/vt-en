import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-return-policy',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './return-policy.component.html',
  styleUrl: './return-policy.component.css',
})
export class ReturnPolicyComponent {
  items = [
    {
      id: 1,
      icon: 'assets/images/return_policy/1.png',
      title: `Instructions for sold cameras`,
      points: [
        `The surveillance cameras that you wish to exchange or return must be in their original condition and not used, defective, or in violation of Saudi standard specifications or the information that was provided to you upon purchase.`,
        `You must return the surveillance cameras with all their accessories, the original packaging, the invoice, and the warranty document, if any.`,
        `You must return the surveillance cameras within 7 days from the date of receipt, unless a longer period is specified in the product description or site policy.`,
      ],
    },
    {
      id: 2,
      icon: 'assets/images/return_policy/2.png',
      title: `Instructions for sold cameras`,
      points: [
        `You can choose to replace the surveillance cameras with other products available on our website of the same or higher value, in which case the difference will be deducted from your balance or requested from you upon delivery.`,
        `You can choose to retrieve the surveillance cameras and recover the amount you paid via the same payment method you used when purchasing, or via a bank transfer to your account, or by adding a balance to your account on our website.`,
        `The refund will be issued within 14 days from the date we receive the returned surveillance cameras, unless a shorter period is specified in the product description or site policy.`,
        `Shipping and handling fees will be deducted from the refund amount, unless the reason for the return is an error on our part, a product defect, or a violation of specifications. Surveillance cameras that have been customized or modified to your request, or that have been opened, installed or operated incorrectly or have been damaged cannot be exchanged or refunded.`,
      ],
    },
  ];
}
