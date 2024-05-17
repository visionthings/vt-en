import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupErrorDialogComponent } from './signup-error-dialog.component';

describe('SignupErrorDialogComponent', () => {
  let component: SignupErrorDialogComponent;
  let fixture: ComponentFixture<SignupErrorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupErrorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
