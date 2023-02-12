import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPotenciaComponent } from './form-potencia.component';

describe('FormPotenciaComponent', () => {
  let component: FormPotenciaComponent;
  let fixture: ComponentFixture<FormPotenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPotenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPotenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
