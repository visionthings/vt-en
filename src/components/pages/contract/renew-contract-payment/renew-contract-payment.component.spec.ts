import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewContractPaymentComponent } from './renew-contract-payment.component';

describe('RenewContractPaymentComponent', () => {
  let component: RenewContractPaymentComponent;
  let fixture: ComponentFixture<RenewContractPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewContractPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewContractPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
