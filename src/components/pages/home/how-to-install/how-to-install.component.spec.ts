import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToInstallComponent } from './how-to-install.component';

describe('HowToInstallComponent', () => {
  let component: HowToInstallComponent;
  let fixture: ComponentFixture<HowToInstallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowToInstallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HowToInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
