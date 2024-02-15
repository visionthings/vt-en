import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-company-values',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './company-values.component.html',
  styleUrl: './company-values.component.css',
})
export class CompanyValuesComponent {
  values: {
    id: number;
    icon: string;
    title: string;
  }[] = [
    {
      id: 1,
      icon: 'assets/images/company_values/1.png',
      title: `الابتكار`,
    },
    {
      id: 2,
      icon: 'assets/images/company_values/2.png',
      title: `الربح للجانبين`,
    },
    {
      id: 3,
      icon: 'assets/images/company_values/3.png',
      title: `التطوير المستمر`,
    },
    {
      id: 4,
      icon: 'assets/images/company_values/4.png',
      title: `الكفاءة`,
    },
    {
      id: 5,
      icon: 'assets/images/company_values/5.png',
      title: `الانضباط`,
    },
  ];
}
