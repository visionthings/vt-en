import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GreenButtonComponent } from '../../../../shared/green-button/green-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-company',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, GreenButtonComponent, RouterLink],
  templateUrl: './about-company.component.html',
  styleUrl: './about-company.component.css',
})
export class AboutCompanyComponent {
  statistics_first_row: { id: number; title: string; image_url: string }[] = [
    {
      id: 1,
      title: 'More than 10 years of experience',
      image_url: 'assets/images/about_company/1.png',
    },
    {
      id: 2,
      title: 'More than 5 partners',
      image_url: 'assets/images/about_company/2.png',
    },
    {
      id: 3,
      title: 'More than 3 hospitality',
      image_url: 'assets/images/about_company/3.png',
    },
  ];
  statistics_second_row: { id: number; title: string; image_url: string }[] = [
    {
      id: 1,
      title: 'More than 2 branches',
      image_url: 'assets/images/about_company/4.png',
    },
    {
      id: 2,
      title: 'More than 100 happy client',
      image_url: 'assets/images/about_company/5.png',
    },
    {
      id: 3,
      title: 'More than 50 projects',
      image_url: 'assets/images/about_company/6.png',
    },
  ];
}
