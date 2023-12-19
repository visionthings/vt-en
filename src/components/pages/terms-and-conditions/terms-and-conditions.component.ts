import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-terms-and-conditions',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './terms-and-conditions.component.html',
  styleUrl: './terms-and-conditions.component.css',
})
export class TermsAndConditionsComponent {
  terms: {
    id: number;
    icon: string;
    title: string;
    description: string;
  }[] = [
    {
      id: 1,
      icon: 'assets/images/terms_and_conditions/1.png',
      title: `Services`,
      description: `Services We provide installation and maintenance services for surveillance cameras for individuals and companies in accordance with the contracts concluded with us. You can request our service by creating a new contract on the website or requesting a visit from our team. We guarantee the quality of our service and guarantee the surveillance cameras for a period of one year from the date of installation.`,
    },
    {
      id: 2,
      icon: 'assets/images/terms_and_conditions/2.png',
      title: `Responsibility`,
      description: `Liability We bear responsibility for any loss or damage resulting from an error or negligence on our part or our team while providing the service. However, we do not accept responsibility for any loss or damage resulting from misuse, unauthorized intervention or factors beyond our control. We also do not bear responsibility for any content or data recorded, transmitted or saved by surveillance cameras. You must respect laws protecting privacy and the rights of others when using surveillance cameras.`,
    },
    {
      id: 3,
      icon: 'assets/images/terms_and_conditions/3.png',
      title: `Intellectual Property`,
      description: `All intellectual property rights in this website and its content are legally protected and belong to us or our licensors. You may not copy, modify, distribute, publish, display, use, reproduce, transmit, sell or create derivative works from any part of this Site or its Content without written permission from us or our licensors.`,
    },
  ];
}
