import { Component, Injectable, OnInit } from '@angular/core';
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
  constructor(private authService: AuthService) {}
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

  ngOnInit(): void {
    this.authService.handleAuth();
    this.authService.isAuthenticated.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      },
    });
  }
}
