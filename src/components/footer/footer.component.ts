import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SmsService } from '../../services/sms.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  constructor(private sms: SmsService) {}
  footerColumns: any[] = [
    {
      id: 1,
      title: `روابط سريعة`,
      items: [
        {
          id: 1,
          title: `الرئيسية`,
          path: '/',
        },
        {
          id: 2,
          title: `عن الشركة`,
          path: '/about-us',
        },
        {
          id: 3,
          title: `عقد الكاميرات`,
          path: '/contract',
        },
        {
          id: 4,
          title: `اتصل بنا`,
          path: '/contact-us',
        },
      ],
    },
    {
      id: 2,
      title: `الأحكام والشروط`,
      items: [
        {
          id: 1,
          title: `الأحكام والشروط`,
          path: '/terms-and-conditions',
        },
        { id: 2, title: `سياسة الخصوصية`, path: '/privacy-policy' },
        {
          id: 3,
          title: `سياسة الاستبدال والاسترجاع`,
          path: '/return-policy',
        },
      ],
    },
    {
      id: 3,
      title: `العنوان`,
      items: [
        {
          id: 1,
          title: `المملكة العربية السعودية - جدة - حي الزهراء`,
          path: null,
        },
        { id: 2, title: `الرمز البريدي: 23522`, path: null },
      ],
    },
  ];
  socialMediaIcons: {
    id: number;
    title: string;
    iconURL: string;
    url: string;
  }[] = [
    {
      id: 1,
      title: 'Facebok',
      iconURL: 'assets/images/social_media/fb.png',
      url: 'https://www.facebook.com/visionthings.sa',
    },
    {
      id: 2,
      title: 'X',
      iconURL: 'assets/images/social_media/x.png',
      url: 'https://twitter.com/visionthings_sa',
    },
    {
      id: 3,
      title: 'LinkedIn',
      iconURL: 'assets/images/social_media/linkedin.png',
      url: 'https://www.linkedin.com/company/visionthings',
    },
    {
      id: 4,
      title: 'YouTube',
      iconURL: 'assets/images/social_media/yt.png',
      url: 'https://www.youtube.com/@visionthings_sa',
    },
  ];
}
