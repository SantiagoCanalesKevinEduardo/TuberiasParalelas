import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDisenioComponent } from './form-disenio.component';

describe('FormDisenioComponent', () => {
  let component: FormDisenioComponent;
  let fixture: ComponentFixture<FormDisenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDisenioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormDisenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
