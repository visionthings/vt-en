import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-create-new-contract',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './create-new-contract.component.html',
  styleUrl: './create-new-contract.component.css',
})
@Injectable({ providedIn: 'root' })
export class CreateNewContractComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  periods: {
    id: number;
    title: string;
  }[] = [
    { id: 1, title: `شهر` },
    { id: 2, title: `شهرين` },
    { id: 3, title: `ثلاثة أشهر` },
    { id: 4, title: `أربعة أشهر` },
    { id: 5, title: `خمسة أشهر` },
    { id: 6, title: `ستة أشهر (موصى به)` },
    { id: 7, title: `سبعة أشهر` },
    { id: 8, title: `ثمانية أشهر` },
    { id: 9, title: `تسعة أشهر` },
    { id: 10, title: `عشرة أشهر` },
    { id: 11, title: `إحدى عشر شهر` },
    { id: 12, title: `إثنى عشر شهر` },
  ];
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  camerasForm = this.fb.group({
    company: ['', [Validators.required]],
    indoor_cameras: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    outdoor_cameras: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    show_screens: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    camera_type: ['', [Validators.required]],
    custom_camera_type: [null],
    storage_device: ['', [Validators.required]],
    custom_storage_device: [null],
    period_of_record: ['', [Validators.required]],
  });

  get company() {
    return this.camerasForm.controls['company'];
  }
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
  get custom_camera_type() {
    return this.camerasForm.controls['custom_camera_type'];
  }
  get storage_device() {
    return this.camerasForm.controls['storage_device'];
  }
  get custom_storage_device() {
    return this.camerasForm.controls['custom_storage_device'];
  }
  get period_of_record() {
    return this.camerasForm.controls['period_of_record'];
  }

  isCustomStorageDevice = false;
  isCustomCameraType = false;

  checkStorageDevice() {
    if (this.camerasForm.controls['storage_device'].value === 'other') {
      this.isCustomStorageDevice = true;
    } else {
      this.isCustomStorageDevice = false;
    }
  }
  checkCameraType() {
    if (this.camerasForm.controls['camera_type'].value === 'other') {
      this.isCustomCameraType = true;
    } else {
      this.isCustomCameraType = false;
    }
  }

  price = 0;
  userCompanies: any = [];

  calcPrice() {
    let camerasCount =
      Number(this.camerasForm.value.indoor_cameras) +
      Number(this.camerasForm.value.outdoor_cameras);
    if (!isNaN(camerasCount)) {
      if (camerasCount === 0) {
        this.price = 0;
      } else if (camerasCount > 0 && camerasCount <= 4) {
        this.price = 499;
      } else if (camerasCount > 4 && camerasCount <= 16) {
        this.price = 999;
      } else if (camerasCount > 16 && camerasCount <= 32) {
        this.price = 1499;
      } else if (camerasCount > 32 && camerasCount <= 64) {
        this.price = 1999;
      } else this.price = camerasCount * 50;
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
        if (this.camerasForm.controls['camera_type'].value !== 'other') {
          localStorage.setItem(
            'camera_type',
            this.camerasForm.value.camera_type
          );
        } else {
          if (this.camerasForm.value.custom_camera_type) {
            localStorage.setItem(
              'camera_type',
              this.camerasForm.value.custom_camera_type
            );
          }
        }
      }
      if (this.camerasForm.value.storage_device) {
        localStorage.setItem(
          'storage_device',
          this.camerasForm.value.storage_device
        );
      }
      if (this.camerasForm.value.storage_device) {
        if (this.camerasForm.controls['storage_device'].value !== 'other') {
          localStorage.setItem(
            'storage_device',
            this.camerasForm.value.storage_device
          );
        } else {
          if (this.camerasForm.value.custom_storage_device) {
            localStorage.setItem(
              'storage_device',
              this.camerasForm.value.custom_storage_device
            );
          }
        }
      }
      if (this.camerasForm.value.period_of_record) {
        localStorage.setItem(
          'period_of_record',
          this.camerasForm.value.period_of_record
        );
      }
      localStorage.setItem('price', this.price.toString());
    }
    let company = this.userCompanies.find((company: any) => {
      return company.id == this.camerasForm.controls['company'].value;
    });

    let address = `${company.building_number} ${company.street} - حي ${company.district} - مدينة ${company.city}`;

    if (typeof window !== 'undefined') {
      localStorage.setItem('company_name', company.company_name);
      localStorage.setItem('commercial_number', company.commercial_number);
      localStorage.setItem('address', address);
    }

    this.camerasForm.reset();
    this.router.navigateByUrl('/contract/payment');
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      let userID = localStorage.getItem('id');

      this.authService.getUserCompanies(userID).subscribe({
        next: (res: any) => {
          this.userCompanies = res;
        },
      });
    }
  }
}
