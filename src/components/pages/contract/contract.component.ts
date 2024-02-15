import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css',
})
export class ContractComponent {
  constructor(private router: Router) {}

  services: {
    id: number;
    title: string;
    path: string;
  }[] = [
    { id: 1, title: `انشاء عقد جديد`, path: 'create-new-contract' },
    { id: 2, title: `العقود المسجلة`, path: 'registered-contracts' },
    { id: 3, title: `طلب زيارة`, path: 'visit-request' },
  ];

  navigateToService(servicePath: string) {
    this.router.navigateByUrl(`/contract/${servicePath}`);
  }
}
