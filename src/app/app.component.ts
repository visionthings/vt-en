import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { register } from 'swiper/element/bundle';
import { AuthService } from '../services/auth.service';
register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'VT';
  // private userActivityTimeout: any;

  // constructor(private authService: AuthService, private router: Router) {}

  // ngAfterViewInit(): void {
  //   this.resetUserActivityTimeout();
  // }
  // @HostListener('window:mousemove')
  // @HostListener('window:keydown')
  // refreshUserActivity(): void {
  //   clearTimeout(this.userActivityTimeout);
  //   this.resetUserActivityTimeout();
  // }

  // private resetUserActivityTimeout(): void {
  //   this.userActivityTimeout = setTimeout(() => {
  //     if (typeof window !== 'undefined') {
  //       localStorage.removeItem('token');
  //     }
  //     this.authService.handleAuth();
  //     this.router.navigateByUrl('/home');
  //   }, 300000);
  // }
}
