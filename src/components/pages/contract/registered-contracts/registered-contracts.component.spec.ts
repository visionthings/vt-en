import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredContractsComponent } from './registered-contracts.component';

describe('RegisteredContractsComponent', () => {
  let component: RegisteredContractsComponent;
  let fixture: ComponentFixture<RegisteredContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredContractsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisteredContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
