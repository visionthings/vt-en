import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GreenButtonComponent } from '../../../../shared/green-button/green-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, GreenButtonComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css',
})
export class OurServicesComponent {
  services: { id: number; icon: string; title: string; content: string }[] = [
    {
      id: 1,
      icon: 'assets/images/our_services/service_1.png',
      title: `Consultation`,
      content:
        'We provide a free consultation and assessment of your security needs and recommend the security products, systems and services that best suit your property and budget.',
    },
    {
      id: 2,
      icon: 'assets/images/our_services/service_2.png',
      title: `Installation`,
      content:
        'We install your cameras and security systems professionally and efficiently, ensuring they are correctly positioned, connected and configured to provide optimal performance and coverage.',
    },
    {
      id: 3,
      icon: 'assets/images/our_services/service_3.png',
      title: `Online Contracting`,
      content:
        'Because your time is important to us, we have provided remote contracting services that enable you to contract, renew the contract, and request a technician’s visit through our website.',
    },
  ];
}
