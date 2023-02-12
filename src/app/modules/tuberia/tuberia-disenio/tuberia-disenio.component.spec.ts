import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuberiaDisenioComponent } from './tuberia-disenio.component';

describe('TuberiaDisenioComponent', () => {
  let component: TuberiaDisenioComponent;
  let fixture: ComponentFixture<TuberiaDisenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuberiaDisenioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuberiaDisenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
