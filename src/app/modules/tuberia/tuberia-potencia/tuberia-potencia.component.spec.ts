import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuberiaPotenciaComponent } from './tuberia-potencia.component';

describe('TuberiaPotenciaComponent', () => {
  let component: TuberiaPotenciaComponent;
  let fixture: ComponentFixture<TuberiaPotenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuberiaPotenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuberiaPotenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
