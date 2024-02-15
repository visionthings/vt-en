import { Component, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-green-button',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './green-button.component.html',
  styleUrl: './green-button.component.css',
})
export class GreenButtonComponent {
  @Input() route: null | string = null;
  @Input() rightIcon: null | string = null;
  @Input() text: null | string = null;
  @Input() leftIcon: null | string = null;
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }
}
