import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GreenButtonComponent } from '../../../custom/green-button/green-button.component';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, GreenButtonComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css',
})
export class OurServicesComponent {
  services: { id: number; icon: string; title: string; content: string }[] = [
    {
      id: 1,
      icon: 'assets/images/our_services/service_1.png',
      title: `الاستشارة`,
      content: `نحن نقدم استشارات مجانية وتقييما لاحتياجاتك الأمنية ونوصي بالمنتجات والأنظمة والخدمات الأمنية الأكثر ملائمة لممتلكاتك وميزانيتك`,
    },
    {
      id: 2,
      icon: 'assets/images/our_services/service_2.png',
      title: `التركيب`,
      content: `نقوم بتثبيت الكاميرات والأنظمة الأمنية الخاصة بك باحترافية وكفاءة, مما يضمن وضعها بشكل صحيح وتوصيلها وتهيئتها لتوفير الأداء والتغطية الأمثل`,
    },
    {
      id: 3,
      icon: 'assets/images/our_services/service_3.png',
      title: `التعاقد عن بعد`,
      content: `لأن وقتك يهمنا قمنا بتوفير خدمات التعاقد عن بعد والتي تمكنك من التعاقد وتجديد العقد وطلب زيارة التقني من خلال موقعنا`,
    },
  ];
}
