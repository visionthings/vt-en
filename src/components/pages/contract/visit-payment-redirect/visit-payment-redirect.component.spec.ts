import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitPaymentRedirectComponent } from './visit-payment-redirect.component';

describe('VisitPaymentRedirectComponent', () => {
  let component: VisitPaymentRedirectComponent;
  let fixture: ComponentFixture<VisitPaymentRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitPaymentRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitPaymentRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
