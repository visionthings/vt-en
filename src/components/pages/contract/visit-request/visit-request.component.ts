import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitRequestService } from '../../../../services/visit-request.service';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-visit-request',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './visit-request.component.html',
  styleUrl: './visit-request.component.css',
})
export class VisitRequestComponent {
  constructor(
    private authService: AuthService,
    private visitRequest: VisitRequestService
  ) {}

  // Handle button clicking
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }
}
