import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  public formGeneral: FormGroup;

  constructor() {}

  getformDatosDisenio() {
    return this.formGeneral;
  }
}
