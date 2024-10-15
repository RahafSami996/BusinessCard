import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCardAddComponent } from './business-card-add.component';

describe('BusinessCardAddComponent', () => {
  let component: BusinessCardAddComponent;
  let fixture: ComponentFixture<BusinessCardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessCardAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
