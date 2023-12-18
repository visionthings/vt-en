import {
  Component,
  Inject,
  Injectable,
  LOCALE_ID,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterModule,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
@Injectable({ providedIn: 'root' })
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    @Inject(LOCALE_ID) public locale: string
  ) {}
  navItems: { id: number; title: string; path: string }[] = [
    {
      id: 1,
      title: $localize`الرئيسية`,
      path: 'home',
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
  ];

  NavbarMenuIsActive: boolean = false;
  toggleNavbarMenu(): void {
    this.NavbarMenuIsActive = !this.NavbarMenuIsActive;
  }

  isLoggedIn: boolean = false;

  // Change language
  lang: string = '';
  changeLanguage() {
    if (typeof window !== 'undefined') {
      const currentURL = window.location.href;
      let newURL;
      if (currentURL.includes('ar-SA')) {
        newURL = currentURL.replace('ar-SA', 'en-US');
        window.location.assign(newURL);
      } else {
        newURL = currentURL.replace('en-US', 'ar-SA');
        window.location.assign(newURL);
      }
    }
  }

  ngOnInit(): void {
    this.authService.handleAuth();
    this.authService.isAuthenticated.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      },
    });
    this.locale === 'ar-SA' ? (this.lang = 'En') : (this.lang = 'العربية');
  }
}
