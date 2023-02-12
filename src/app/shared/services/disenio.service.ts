import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DisenioService {
  public formDatosDisenio: FormGroup;

  constructor() {}

  getformDatosDisenio() {
    return this.formDatosDisenio;
  }
}
