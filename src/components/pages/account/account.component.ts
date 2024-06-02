import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLinkActive, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, NgOptimizedImage],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  constructor(private router: Router) {}
  items: {
    id: number;
    title: string;
    path: string;
  }[] = [
    {
      id: 1,
      title: `Personal Information`,
      path: 'personal-information',
    },
    { id: 2, title: `Change Password`, path: 'change-password' },
    { id: 3, title: `Sign Out`, path: 'sign-out' },
  ];

  navigateToService(servicePath: string) {
    this.router.navigateByUrl(`/account/${servicePath}`);
  }
}
