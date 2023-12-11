import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { OurServicesComponent } from './our-services/our-services.component';
import { HowToInstallComponent } from './how-to-install/how-to-install.component';
import { WhyChooseComponent } from './why-choose/why-choose.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    AboutCompanyComponent,
    OurServicesComponent,
    HowToInstallComponent,
    WhyChooseComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
