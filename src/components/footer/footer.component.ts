import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  footerColumns: any[] = [
    {
      id: 1,
      title: $localize`روابط سريعة`,
      items: [
        {
          id: 1,
          title: $localize`الرئيسية`,
          path: '/',
        },
        {
          id: 2,
          title: $localize`عن الشركة`,
          path: '/about-us',
        },
        {
          id: 3,
          title: $localize`عقد الكاميرات`,
          path: '/contract',
        },
        {
          id: 4,
          title: $localize`اتصل بنا`,
          path: '/contact-us',
        },
      ],
    },
    {
      id: 2,
      title: $localize`الأحكام والشروط`,
      items: [
        {
          id: 1,
          title: $localize`الأحكام والشروط`,
          path: '/terms-and-conditions',
        },
        { id: 2, title: $localize`سياسة الخصوصية`, path: '/privacy-policy' },
        {
          id: 3,
          title: $localize`سياسة الاستبدال والاسترجاع`,
          path: '/return-policy',
        },
      ],
    },
    {
      id: 3,
      title: $localize`العنوان`,
      items: [
        {
          id: 1,
          title: $localize`المملكة العربية السعودية - جدة - حي الزهراء`,
          path: null,
        },
        { id: 2, title: $localize`الرمز البريدي: 23522`, path: null },
      ],
    },
  ];
  socialMediaIcons: {
    id: number;
    title: string;
    icon: string;
    url: string;
  }[] = [
    {
      id: 1,
      title: 'Facebook',
      icon: 'assets/images/social_media_icons/facebook.png',
      url: 'https://www.facebook.com',
    },
    {
      id: 2,
      title: 'Instagram',
      icon: 'assets/images/social_media_icons/instagram.png',
      url: 'https://www.instagram.com',
    },
    {
      id: 3,
      title: 'Linked In',
      icon: 'assets/images/social_media_icons/linkedin.png',
      url: 'https://www.linkedin.com',
    },
    {
      id: 4,
      title: 'Snapchat',
      icon: 'assets/images/social_media_icons/snapchat.png',
      url: 'https://www.snapchat.com',
    },
  ];
}
