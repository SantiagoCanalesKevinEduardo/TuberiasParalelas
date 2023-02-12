import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { DisenioService } from '../../services/disenio.service';

@Component({
  selector: 'app-form-potencia',
  templateUrl: './form-potencia.component.html',
  styleUrls: ['./form-potencia.component.scss'],
})
export class FormPotenciaComponent {
  formTbDisenio: FormGroup;

  //constructor
  constructor(
    public formBuilder: FormBuilder,
    private servicioDisenio: DisenioService
  ) {
    this.formTbDisenio = this.formBuilder.group({
      p: new FormControl(null, [Validators.required]),
      u: new FormControl(null, [Validators.required]),
      P: new FormControl(null, [Validators.required]),
      Q: new FormControl(null, [Validators.required]),
      contenidos: this.formBuilder.array([
        this.formBuilder.group({
          l: new FormControl(null, [Validators.required]),
          d: new FormControl(null, [Validators.required]),
          ks: new FormControl(null, [Validators.required]),
          k: new FormControl(null, [Validators.required]),
        }),
      ]),
    });
  }

  //ngOnInit: lo que se ejcuta siempre
  ngOnInit(): void {}

  //metodo para subir datos del formulario

  public onSubmit() {
    if (!this.formTbDisenio.invalid) {
      this.servicioDisenio.formDatosDisenio = this.formTbDisenio;

      this.DatosGurdados();
    } else if (this.formTbDisenio.invalid) {
      this.Error();
    }
  }
  //metodo para obtener nuevos formularios y obtener sus datos
  get contenidos() {
    return this.formTbDisenio.get('contenidos') as FormArray;
  }
  addContenido() {
    let contenidos = this.formBuilder.group({
      l: new FormControl(null, [Validators.required]),
      d: new FormControl(null, [Validators.required]),
      ks: new FormControl(null, [Validators.required]),
      k: new FormControl(null, [Validators.required]),
    });
    this.contenidos.push(contenidos);
  }

  private DatosGurdados() {
    Swal.fire(
      'Buen trabajo!',
      'Ahora solo te queda pulsar el boton de resolver',
      'success'
    );
  }
  private Error() {
    Swal.fire('Datos Incompletos!', 'Ingrese los que faltan', 'error');
  }
  //funcion para marcar error si falta algun dato en el formulario
}
