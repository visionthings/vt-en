import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitRequestComponent } from './visit-request.component';

describe('VisitRequestComponent', () => {
  let component: VisitRequestComponent;
  let fixture: ComponentFixture<VisitRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
