import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalContractComponent } from './final-contract.component';

describe('FinalContractComponent', () => {
  let component: FinalContractComponent;
  let fixture: ComponentFixture<FinalContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalContractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
