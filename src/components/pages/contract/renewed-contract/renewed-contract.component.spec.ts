import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewedContractComponent } from './renewed-contract.component';

describe('RenewedContractComponent', () => {
  let component: RenewedContractComponent;
  let fixture: ComponentFixture<RenewedContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenewedContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenewedContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
