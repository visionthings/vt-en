import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-success-message',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './success-message.component.html',
  styleUrl: './success-message.component.css',
})
export class SuccessMessageComponent implements OnInit {
  @Input() message: string | null = null;

  closeIcon = faXmark;

  closeMessage(): void {
    this.message = null;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.message = null;
    }, 7000);
  }
}
