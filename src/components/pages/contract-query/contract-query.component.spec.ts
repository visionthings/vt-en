import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractQueryComponent } from './contract-query.component';

describe('ContractQueryComponent', () => {
  let component: ContractQueryComponent;
  let fixture: ComponentFixture<ContractQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContractQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
