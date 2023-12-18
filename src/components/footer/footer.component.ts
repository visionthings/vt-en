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
  data: any = {
    api_id: 'API94645066018',
    api_password: 'tmGeSwL5SA',
    sms_type: 'T',
    encoding: 'U',
    sender_id: 'Gateway.sa',
    phonenumber: '0544542828',
    templateid: '909',
    V1: 'Ahmed',
    V2: '83747',
  };

  sendOTP() {
    this.sms
      .sendOTP(this.data)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
