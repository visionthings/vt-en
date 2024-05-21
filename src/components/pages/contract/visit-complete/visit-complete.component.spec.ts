import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCompleteComponent } from './visit-complete.component';

describe('VisitCompleteComponent', () => {
  let component: VisitCompleteComponent;
  let fixture: ComponentFixture<VisitCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
