import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLinkActive, RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';

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
  constructor(private authService: AuthService, private router: Router) {}
  navItems: { id: number; title: string; path: string }[] = [
    {
      id: 1,
      title: `Home`,
      path: 'home',
    },
    {
      id: 2,
      title: `About Us`,
      path: '/about-us',
    },
    {
      id: 3,
      title: `Cameras Contract`,
      path: '/contract',
    },
    {
      id: 4,
      title: `Contact Us`,
      path: '/contact-us',
    },
  ];

  NavbarMenuIsActive: boolean = false;
  toggleNavbarMenu(): void {
    this.NavbarMenuIsActive = !this.NavbarMenuIsActive;
  }

  isLoggedIn: boolean = false;

  changeLanguage() {
    if (typeof window !== 'undefined') {
      location.href = `https://vt.com.sa/home`;
    }
  }

  ngOnInit(): void {
    this.authService.handleAuth();

    this.authService.isAuthenticated.subscribe({
      next: (res) => {
        this.isLoggedIn = res;
      },
    });

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('visitStored') !== 'yes') {
        this.authService.storeVisit().subscribe({
          next: (res) => {
            localStorage.setItem('visitStored', 'yes');
          },
        });
      }
    }
  }
}
