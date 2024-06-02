import { Routes } from '@angular/router';
import { HomeComponent } from '../components/pages/home/home.component';
import { AboutUsComponent } from '../components/pages/about-us/about-us.component';
import { ContactUsComponent } from '../components/pages/contact-us/contact-us.component';
import { ContractComponent } from '../components/pages/contract/contract.component';
import { CreateNewContractComponent } from '../components/pages/contract/create-new-contract/create-new-contract.component';
import { RegisteredContractsComponent } from '../components/pages/contract/registered-contracts/registered-contracts.component';
import { VisitRequestComponent } from '../components/pages/contract/visit-request/visit-request.component';
import { TermsAndConditionsComponent } from '../components/pages/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from '../components/pages/privacy-policy/privacy-policy.component';
import { ReturnPolicyComponent } from '../components/pages/return-policy/return-policy.component';
import { SignInComponent } from '../components/pages/sign-in/sign-in.component';
import { SignUpComponent } from '../components/pages/sign-up/sign-up.component';
import { AccountComponent } from '../components/pages/account/account.component';
import { PersonalInformationComponent } from '../components/pages/account/personal-information/personal-information.component';
import { ChangePasswordComponent } from '../components/pages/account/change-password/change-password.component';
import { SignOutComponent } from '../components/pages/account/sign-out/sign-out.component';
import { PaymentComponent } from '../components/pages/contract/payment/payment.component';
import { FinalContractComponent } from '../components/pages/contract/final-contract/final-contract.component';
import { PaymentRedirectComponent } from '../components/pages/contract/payment-redirect/payment-redirect.component';
import { authGuard } from '../guards/auth.guard';
import { EmailVerificationComponent } from '../components/pages/email-verification/email-verification.component';
import { EmailVerifiedComponent } from '../components/pages/email-verified/email-verified.component';
import { CompaniesComponent } from '../components/pages/contract/companies/companies.component';
import { ContractQueryComponent } from '../components/pages/contract-query/contract-query.component';
import { CompanyInformationComponent } from '../components/pages/company-information/company-information.component';
import { VisitPaymentComponent } from '../components/pages/contract/visit-payment/visit-payment.component';
import { VisitPaymentRedirectComponent } from '../components/pages/contract/visit-payment-redirect/visit-payment-redirect.component';
import { VisitCompleteComponent } from '../components/pages/contract/visit-complete/visit-complete.component';
import { RenewContractPaymentComponent } from '../components/pages/contract/renew-contract-payment/renew-contract-payment.component';
import { RenewContractPaymentRedirectComponent } from '../components/pages/contract/renew-contract-payment-redirect/renew-contract-payment-redirect.component';
import { RenewedContractComponent } from '../components/pages/contract/renewed-contract/renewed-contract.component';
import { ResetPasswordComponent } from '../components/pages/reset-password/reset-password.component';
import { contractGuard } from '../guards/contract.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contract-query/:id', component: ContractQueryComponent },
  {
    path: 'contract',
    component: ContractComponent,
    pathMatch: 'prefix',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'create-new-contract',
        pathMatch: 'full',
      },
      {
        path: 'create-new-contract',
        component: CreateNewContractComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'payment-redirect',
        component: PaymentRedirectComponent,
      },
      {
        path: 'final-contract',
        component: FinalContractComponent,
        canActivate: [contractGuard],
      },
      {
        path: 'registered-contracts',
        component: RegisteredContractsComponent,
      },
      {
        path: 'renew-contract-payment',
        component: RenewContractPaymentComponent,
      },
      {
        path: 'renew-contract-payment-redirect',
        component: RenewContractPaymentRedirectComponent,
      },
      {
        path: 'renewed-contract',
        component: RenewedContractComponent,
        canActivate: [contractGuard],
      },
      { path: 'companies', component: CompaniesComponent },
      {
        path: 'visit-request',
        component: VisitRequestComponent,
      },
      { path: 'visit-payment', component: VisitPaymentComponent },
      {
        path: 'visit-payment-redirect',
        component: VisitPaymentRedirectComponent,
      },
      { path: 'visit-complete', component: VisitCompleteComponent },
    ],
  },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'return-policy', component: ReturnPolicyComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'company-information', component: CompanyInformationComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'email-verified', component: EmailVerifiedComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'account',
    component: AccountComponent,
    pathMatch: 'prefix',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'personal-information',
        pathMatch: 'full',
      },
      {
        path: 'personal-information',
        component: PersonalInformationComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },

      {
        path: 'sign-out',
        component: SignOutComponent,
      },
    ],
  },
];
