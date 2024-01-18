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
      title: 'Quick Links',
      items: [
        {
          id: 1,
          title: 'Home',
          path: '/',
        },
        {
          id: 2,
          title: 'About Us',
          path: '/about-us',
        },
        {
          id: 3,
          title: 'Cameras Contract',
          path: '/contract',
        },
        {
          id: 4,
          title: 'Contact Us',
          path: '/contact-us',
        },
      ],
    },
    {
      id: 2,
      title: 'Terms & Conditions',
      items: [
        {
          id: 1,
          title: 'Terms & Conditions',
          path: '/terms-and-conditions',
        },
        { id: 2, title: 'Privacy Policy', path: '/privacy-policy' },
        {
          id: 3,
          title: 'Return & Exchange Policy',
          path: '/return-policy',
        },
      ],
    },
    {
      id: 3,
      title: `Address`,
      items: [
        {
          id: 1,
          title: `The Kingdom of Saudi Arabia - Jeddah - Al-Zahraa District`,
          path: null,
        },
        { id: 2, title: `Zip Code: 23522`, path: null },
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
