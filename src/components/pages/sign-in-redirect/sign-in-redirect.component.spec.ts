import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInRedirectComponent } from './sign-in-redirect.component';

describe('SignInRedirectComponent', () => {
  let component: SignInRedirectComponent;
  let fixture: ComponentFixture<SignInRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
