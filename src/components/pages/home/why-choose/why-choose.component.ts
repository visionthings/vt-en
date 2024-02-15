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
      title: `السعر أفضل من سعر السوق`,
      description: `تقدم رؤية الأشياء دائما أفضل الأسعار مقارنة بالسوق المحلي والعالمي`,
    },
    {
      id: 2,
      icon: 'assets/images/why-choose/2.png',
      title: `تقديم الدعم الفني للمعدات التقنية`,
      description: `كما نقدم الدعم الفني والمساعدة والزيارات لحل المشاكل`,
    },
    {
      id: 3,
      icon: 'assets/images/why-choose/3.png',
      title: `توريد المعدات التقنية الجديدة`,
      description: `توفر شركة رؤية الأشياء حلولا تقنية جديدة تماما وأفضل دائما`,
    },
    {
      id: 4,
      icon: 'assets/images/why-choose/4.png',
      title: `تقديم الحلول التقنية المناسبة`,
      description: `نحن دائما نختار ونوصي بالاختيار الأفضل والحلول المناسبة لعملائنا`,
    },
    {
      id: 5,
      icon: 'assets/images/why-choose/5.png',
      title: `خبرة الشركة في المجال التقني`,
      description: `تتمتع الشركة بالخبرة الكافية في مجالات تكنولوجيا المعلومات على أيدي مهندسينا`,
    },
  ];
}
