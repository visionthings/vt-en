import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sign-out.component.html',
  styleUrl: './sign-out.component.css',
})
@Injectable({ providedIn: 'root' })
export class SignOutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  signOut() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.authService.handleAuth();
    this.router.navigateByUrl('/home');
  }
}
