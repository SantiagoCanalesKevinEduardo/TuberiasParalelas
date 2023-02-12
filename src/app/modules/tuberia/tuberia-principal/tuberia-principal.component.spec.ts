import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuberiaPrincipalComponent } from './tuberia-principal.component';

describe('TuberiaPrincipalComponent', () => {
  let component: TuberiaPrincipalComponent;
  let fixture: ComponentFixture<TuberiaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuberiaPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuberiaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
