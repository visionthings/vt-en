import { Component, Injectable, OnInit } from "@angular/core";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { ReactiveFormsModule, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../../services/auth.service";
import { ContractService } from "../../../../services/contract.service";

@Component({
  selector: "app-create-new-contract",
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: "./create-new-contract.component.html",
  styleUrl: "./create-new-contract.component.css",
})
@Injectable({ providedIn: "root" })
export class CreateNewContractComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private contractService: ContractService
  ) {}
  periods: {
    id: number;
    title: string;
  }[] = [
    { id: 1, title: `1 Month` },
    { id: 2, title: `2 Months` },
    { id: 3, title: `3 Months` },
    { id: 4, title: `4 Months` },
    { id: 5, title: `5 Months` },
    { id: 6, title: `6 Months` },
    { id: 7, title: `7 Months` },
    { id: 8, title: `8 Months` },
    { id: 9, title: `9 Months` },
    { id: 10, title: `10 Months` },
    { id: 11, title: `11 Months` },
    { id: 12, title: `12 Months` },
  ];
  clicking: boolean = false;

  handleClickingChange() {
    this.clicking = !this.clicking;
  }

  camerasForm = this.fb.group({
    company: ["", [Validators.required]],
    indoor_cameras: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
    outdoor_cameras: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
    show_screens: ["", [Validators.required, Validators.pattern(/^\d+$/)]],
    camera_type: ["", [Validators.required]],
    custom_camera_type: [null],
    storage_device: ["", [Validators.required]],
    custom_storage_device: [null],
    period_of_record: ["", [Validators.required]],
  });

  get company() {
    return this.camerasForm.controls["company"];
  }
  get indoor_cameras() {
    return this.camerasForm.controls["indoor_cameras"];
  }
  get outdoor_cameras() {
    return this.camerasForm.controls["outdoor_cameras"];
  }
  get show_screens() {
    return this.camerasForm.controls["show_screens"];
  }
  get camera_type() {
    return this.camerasForm.controls["camera_type"];
  }
  get custom_camera_type() {
    return this.camerasForm.controls["custom_camera_type"];
  }
  get storage_device() {
    return this.camerasForm.controls["storage_device"];
  }
  get custom_storage_device() {
    return this.camerasForm.controls["custom_storage_device"];
  }
  get period_of_record() {
    return this.camerasForm.controls["period_of_record"];
  }

  isCustomStorageDevice = false;
  isCustomCameraType = false;

  checkStorageDevice() {
    if (this.camerasForm.controls["storage_device"].value === "other") {
      this.isCustomStorageDevice = true;
    } else {
      this.isCustomStorageDevice = false;
    }
  }
  checkCameraType() {
    if (this.camerasForm.controls["camera_type"].value === "other") {
      this.isCustomCameraType = true;
    } else {
      this.isCustomCameraType = false;
    }
  }

  price: any = 0;
  userCompanies: any = [];
  cameraPrices: any = [];

  calcPrice() {
    this.price = 0;
    let total_cameras =
      Number(this.camerasForm.value.indoor_cameras) +
      Number(this.camerasForm.value.outdoor_cameras);

    let defaultPriceRecord = this.cameraPrices.find((p: any) => {
      return p.to == 0;
    });

    let defaultPrice = defaultPriceRecord.price;

    for (let i = 0; i < this.cameraPrices.length; i++) {
      if (
        total_cameras >= this.cameraPrices[i].from &&
        total_cameras <= this.cameraPrices[i].to &&
        this.cameraPrices[i].to != 0
      ) {
        this.price = Number(this.cameraPrices[i].price).toFixed(2);
      }
    }
    if (this.price === 0) {
      this.price = (Number(defaultPrice) * total_cameras).toFixed(2);
    }
  }

  onSubmit() {
    this.camerasForm.markAllAsTouched();

    let company = this.userCompanies.find((company: any) => {
      return company.id == this.camerasForm.controls["company"].value;
    });

    let address = `${company.building_number} ${company.street} - حي ${company.district} - مدينة ${company.city}`;

    this.contractService
      .createContract({
        commercial_number: company.commercial_number,
        address: address,
        indoor_cameras: this.camerasForm.controls["indoor_cameras"].value,
        outdoor_cameras: this.camerasForm.controls["outdoor_cameras"].value,
        storage_device: this.camerasForm.controls["storage_device"].value,
        period_of_record: this.camerasForm.controls["period_of_record"].value,
        show_screens: this.camerasForm.controls["show_screens"].value,
        camera_type: this.camerasForm.controls["camera_type"].value,
        total_price: this.price,
      })
      .subscribe({
        next: (res: any) => {
          if (typeof window !== "undefined") {
            localStorage.setItem("contract_number", res.id);
          }

          this.camerasForm.reset();
          this.router.navigateByUrl("/contract/payment");
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
  }

  ngOnInit(): void {
    this.contractService.getCamerasPriceList().subscribe({
      next: (res: any) => {
        this.cameraPrices = res;
      },
    });

    if (typeof window !== "undefined") {
      let userID = localStorage.getItem("id");

      this.authService.getUserCompanies(userID).subscribe({
        next: (res: any) => {
          this.userCompanies = res;
        },
      });
    }
  }
}
