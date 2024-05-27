import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GreenButtonComponent } from '../../../custom/green-button/green-button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, GreenButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
