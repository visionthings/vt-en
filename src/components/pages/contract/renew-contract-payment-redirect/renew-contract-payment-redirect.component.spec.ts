import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewContractPaymentRedirectComponent } from './renew-contract-payment-redirect.component';

describe('RenewContractPaymentRedirectComponent', () => {
  let component: RenewContractPaymentRedirectComponent;
  let fixture: ComponentFixture<RenewContractPaymentRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewContractPaymentRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewContractPaymentRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
