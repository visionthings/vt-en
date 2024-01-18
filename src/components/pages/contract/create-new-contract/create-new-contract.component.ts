import { Component, Injectable } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-contract',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './create-new-contract.component.html',
  styleUrl: './create-new-contract.component.css',
})
@Injectable({ providedIn: 'root' })
export class CreateNewContractComponent {
  constructor(private fb: FormBuilder, private router: Router) {}
  periods: {
    id: number;
    title: string;
  }[] = [
    { id: 1, title: `1 Month` },
    { id: 2, title: `2 Months` },
    { id: 3, title: '3 Months' },
    { id: 4, title: '4 Months' },
    { id: 5, title: '5 Months' },
    { id: 6, title: '6 Months' },
    { id: 7, title: '7 Months' },
    { id: 8, title: '8 Months' },
    { id: 9, title: '9 Months' },
    { id: 10, title: '10 Months' },
    { id: 11, title: '11 Months' },
    { id: 12, title: '12 Months' },
  ];
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  camerasForm = this.fb.group({
    indoor_cameras: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    outdoor_cameras: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    show_screens: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    camera_type: ['', [Validators.required]],
    storage_device: ['', [Validators.required]],
    period_of_record: ['', [Validators.required]],
  });

  get indoor_cameras() {
    return this.camerasForm.controls['indoor_cameras'];
  }
  get outdoor_cameras() {
    return this.camerasForm.controls['outdoor_cameras'];
  }
  get show_screens() {
    return this.camerasForm.controls['show_screens'];
  }
  get camera_type() {
    return this.camerasForm.controls['camera_type'];
  }
  get storage_device() {
    return this.camerasForm.controls['storage_device'];
  }
  get period_of_record() {
    return this.camerasForm.controls['period_of_record'];
  }

  price = 0;

  calcPrice() {
    let camerasCount =
      Number(this.camerasForm.value.indoor_cameras) +
      Number(this.camerasForm.value.outdoor_cameras);
    if (!isNaN(camerasCount)) {
      if (camerasCount === 0) {
        this.price = 0;
      } else if (camerasCount > 0 && camerasCount <= 4) {
        this.price = 300;
      } else if (camerasCount > 4 && camerasCount <= 16) {
        this.price = 750;
      } else if (camerasCount > 16 && camerasCount <= 32) {
        this.price = 1300;
      } else if (camerasCount > 32 && camerasCount <= 64) {
        this.price = 1800;
      } else this.price = camerasCount * 40;
    } else this.price = 0;
  }
  onSubmit() {
    this.camerasForm.markAllAsTouched();
    let total_cameras = (
      Number(this.camerasForm.value.indoor_cameras) +
      Number(this.camerasForm.value.outdoor_cameras)
    ).toString();
    if (typeof window !== 'undefined') {
      if (this.camerasForm.value.indoor_cameras) {
        localStorage.setItem(
          'indoor_cameras',
          this.camerasForm.value.indoor_cameras
        );
      }
      if (this.camerasForm.value.outdoor_cameras) {
        localStorage.setItem(
          'outdoor_cameras',
          this.camerasForm.value.outdoor_cameras
        );
      }
      localStorage.setItem('total_cameras', total_cameras);
      if (this.camerasForm.value.show_screens) {
        localStorage.setItem(
          'show_screens',
          this.camerasForm.value.show_screens
        );
      }
      if (this.camerasForm.value.camera_type) {
        localStorage.setItem('camera_type', this.camerasForm.value.camera_type);
      }
      if (this.camerasForm.value.storage_device) {
        localStorage.setItem(
          'storage_device',
          this.camerasForm.value.storage_device
        );
      }
      if (this.camerasForm.value.period_of_record) {
        localStorage.setItem(
          'period_of_record',
          this.camerasForm.value.period_of_record
        );
      }
      localStorage.setItem('price', this.price.toString());
    }
    this.camerasForm.reset();
    this.router.navigateByUrl('contract/payment');
  }
}
