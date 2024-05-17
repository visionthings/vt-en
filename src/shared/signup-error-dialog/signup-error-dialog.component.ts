import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup-error-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogActions, MatDialogClose, RouterLink],
  templateUrl: './signup-error-dialog.component.html',
  styleUrl: './signup-error-dialog.component.css',
})
export class SignupErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SignupErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
