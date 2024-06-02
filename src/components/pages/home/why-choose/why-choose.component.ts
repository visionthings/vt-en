import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './why-choose.component.html',
  styleUrl: './why-choose.component.css',
})
export class WhyChooseComponent {
  points: {
    id: number;
    icon: string;
    title: string;
    description: string;
  }[] = [
    {
      id: 1,
      icon: 'assets/images/why-choose/1.png',
      title: `The price is better than the market price`,
      description: `Vision Things always offers the best prices compared to the local and international market`,
    },
    {
      id: 2,
      icon: 'assets/images/why-choose/2.png',
      title: `Providing technical support for technical equipment`,
      description:
        'We also provide technical support, assistance and visits to solve problems.',
    },
    {
      id: 3,
      icon: 'assets/images/why-choose/3.png',
      title: `Supply of new technical equipment`,
      description: `Things Vision provides completely new and always better technology solutions`,
    },
    {
      id: 4,
      icon: 'assets/images/why-choose/4.png',
      title: `Providing appropriate technical solutions`,
      description: `We always choose and recommend the best choice and appropriate solutions for our clients`,
    },
    {
      id: 5,
      icon: 'assets/images/why-choose/5.png',
      title: `The company's experience in the technical field`,
      description:
        'The company has sufficient experience in the fields of information technology at the hands of our engineers.',
    },
  ];
}
