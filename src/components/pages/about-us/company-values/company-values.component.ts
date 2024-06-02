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
      title: `Creativity`,
    },
    {
      id: 2,
      icon: 'assets/images/company_values/2.png',
      title: `Win-Win Situation`,
    },
    {
      id: 3,
      icon: 'assets/images/company_values/3.png',
      title: `Continuous development`,
    },
    {
      id: 4,
      icon: 'assets/images/company_values/4.png',
      title: `Efficiency`,
    },
    {
      id: 5,
      icon: 'assets/images/company_values/5.png',
      title: `Discipline`,
    },
  ];
}
