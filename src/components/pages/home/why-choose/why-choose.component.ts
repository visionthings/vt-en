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
      icon: '../../../../assets/images/why-choose/1.png',
      title: $localize`السعر أفضل من سعر السوق`,
      description: $localize`تقدم رؤية الأشياء دائما أفضل الأسعار مقارنة بالسوق المحلي والعالمي`,
    },
    {
      id: 2,
      icon: '../../../../assets/images/why-choose/2.png',
      title: $localize`تقديم الدعم الفني للمعدات التقنية`,
      description: $localize`كما نقدم الدعم الفني والمساعدة والزيارات لحل المشاكل`,
    },
    {
      id: 3,
      icon: '../../../../assets/images/why-choose/3.png',
      title: $localize`توريد المعدات التقنية الجديدة`,
      description: $localize`توفر شركة رؤية الأشياء حلولا تقنية جديدة تماما وأفضل دائما`,
    },
    {
      id: 4,
      icon: '../../../../assets/images/why-choose/4.png',
      title: $localize`تقديم الحلول التقنية المناسبة`,
      description: $localize`نحن دائما نختار ونوصي بالاختيار الأفضل والحلول المناسبة لعملائنا`,
    },
    {
      id: 5,
      icon: '../../../../assets/images/why-choose/5.png',
      title: $localize`خبرة الشركة في المجال التقني`,
      description: $localize`تتمتع الشركة بالخبرة الكافية في مجالات تكنولوجيا المعلومات على أيدي مهندسينا`,
    },
  ];
}
