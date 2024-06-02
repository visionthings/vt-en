import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../../services/auth.service";
import { RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ErrorMessageComponent } from "../../../../shared/error-message/error-message.component";

@Component({
  selector: "app-companies",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FontAwesomeModule,
    ErrorMessageComponent,
  ],
  templateUrl: "./companies.component.html",
  styleUrl: "./companies.component.css",
})
export class CompaniesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  isLoading = true;

  // Icons
  deleteIcon = faTrashCan;

  companies: any = [];
  errorMessage: string | null = null;
  companyForm = this.fb.group({
    commercial_number: [
      "",
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
  });

  get commercial_number() {
    return this.companyForm.controls["commercial_number"];
  }

  addCompany() {
    this.companyForm.markAllAsTouched();
    if (this.companies.length === 3) {
      this.errorMessage = "You can add up to 3 companies only.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    } else {
      let userID = typeof window !== "undefined" && localStorage.getItem("id");
      let commercial_number =
        this.companyForm.controls["commercial_number"].value;
      this.authService.getCompanyData(commercial_number).subscribe({
        next: (res: any) => {
          let companyData = {
            commercial_number:
              this.companyForm.controls["commercial_number"].value,
            company_name: res.crName,
            company_type: res.businessType.name,
            building_number: res.address.national.buildingNumber,
            street: res.address.national.streetName,
            district: res.address.national.districtName,
            city: res.address.national.city,
          };

          this.authService.addCompanyToUser(companyData, userID).subscribe({
            next: (res) => {
              this.authService.getUserCompanies(userID).subscribe({
                next: (res) => {
                  this.companies = res;
                },
              });
            },
            error: (err) => {
              this.errorMessage = err.error.message;
            },
          });
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
    }
  }

  // Delete Company
  deleteCompany(companyID: any) {
    if (this.companies.length > 1) {
      this.authService.deleteCompany(companyID).subscribe({
        next: () => {
          let userID: any;
          if (typeof window !== "undefined") {
            userID = localStorage.getItem("id");
          }
          this.authService.getUserCompanies(userID).subscribe({
            next: (res: any) => {
              this.companies = res;
            },
          });
        },
      });
    } else {
      this.errorMessage =
        "You should leave at least one company in your account.";
      setTimeout(() => {
        this.errorMessage = null;
      }, 4000);
    }
  }

  ngOnInit(): void {
    let userID: any;
    if (typeof window !== "undefined") {
      userID = localStorage.getItem("id");
    }
    this.authService.getUserCompanies(userID).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.companies = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
