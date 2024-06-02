import { Component, Injectable, Inject, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage, AsyncPipe } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ContactUsService } from '../../../services/contact-us.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Subscription, first } from 'rxjs';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
@Injectable({ providedIn: 'root' })
export class ContactUsComponent implements OnDestroy {
  constructor(
    private fb: FormBuilder,
    private contactUsService: ContactUsService,
    public dialog: MatDialog
  ) {}

  // Handle clicking button
  clicking: boolean = false;

  handleClickingChange(): void {
    this.clicking = !this.clicking;
  }

  // Contact us form validation
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(
          /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/
        ),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(3)]],
    recaptchaReactive: ['', Validators.required],
  });

  get name() {
    return this.contactForm.controls['name'];
  }
  get phone() {
    return this.contactForm.controls['phone'];
  }
  get email() {
    return this.contactForm.controls['email'];
  }
  get subject() {
    return this.contactForm.controls['subject'];
  }
  get message() {
    return this.contactForm.controls['message'];
  }
  get recaptchaReactive() {
    return this.contactForm.controls['recaptchaReactive'];
  }
  openDialog(message: string) {
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        message: message,
      },
    });
  }

  submit$!: Subscription;

  onSubmit(): void {
    this.contactForm.markAllAsTouched();
    this.submit$ = this.contactUsService
      .sendMessage(this.contactForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.contactForm.reset();
          this.openDialog(`تم الإرسال بنجاح، شكرا لتواصلكم معنا.`);
        },
        error: () => {
          this.openDialog(
            `تعذر الإرسال في الوقت الحالي، يرجى المحاولة في وقت آخر.`
          );
        },
      });
  }

  ngOnDestroy(): void {
    if (this.submit$) {
      this.submit$.unsubscribe();
    }
  }
}

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'contact-us-modal.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    AsyncPipe,
  ],
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }
}
