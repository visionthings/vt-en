import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GreenButtonComponent } from '../../../custom/green-button/green-button.component';

@Component({
  selector: 'app-about-company',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, GreenButtonComponent],
  templateUrl: './about-company.component.html',
  styleUrl: './about-company.component.css',
})
export class AboutCompanyComponent {
  statistics_first_row: { id: number; title: string; image_url: string }[] = [
    {
      id: 1,
      title: `أكثر من 10 سنوات من الخبرة`,
      image_url: 'assets/images/about_company/1.png',
    },
    {
      id: 2,
      title: `أكثر من 5 شركاء`,
      image_url: 'assets/images/about_company/2.png',
    },
    {
      id: 3,
      title: `أكثر من 3 ضيافة`,
      image_url: 'assets/images/about_company/3.png',
    },
  ];
  statistics_second_row: { id: number; title: string; image_url: string }[] = [
    {
      id: 1,
      title: `أكثر من 2 مكتب`,
      image_url: 'assets/images/about_company/4.png',
    },
    {
      id: 2,
      title: `أكثر من 100 عميل سعيد`,
      image_url: 'assets/images/about_company/5.png',
    },
    {
      id: 3,
      title: `أكثر من 50 مشروع`,
      image_url: 'assets/images/about_company/6.png',
    },
  ];
}
