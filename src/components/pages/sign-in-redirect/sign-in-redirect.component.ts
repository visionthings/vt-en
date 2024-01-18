import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-in-redirect',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sign-in-redirect.component.html',
  styleUrl: './sign-in-redirect.component.css',
})
@Injectable({ providedIn: 'root' })
export class SignInRedirectComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 1000);
  }
}
