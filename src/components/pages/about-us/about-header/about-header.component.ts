import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-about-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about-header.component.html',
  styleUrl: './about-header.component.css',
})
export class AboutHeaderComponent {}
