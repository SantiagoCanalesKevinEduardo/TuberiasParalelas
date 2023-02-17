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
  selector: 'app-form-disenio',
  templateUrl: './form-disenio.component.html',
  styleUrls: ['./form-disenio.component.scss'],
})
export class FormDisenioComponent implements OnInit {
  //datos-variables

  formTbDisenio: FormGroup;

  //constructor
  constructor(
    public formBuilder: FormBuilder,
    private servicioDisenio: DisenioService
  ) {
    this.formTbDisenio = this.formBuilder.group({
      //densidad
      p: new FormControl(null, [Validators.required]),
      //mu
      u: new FormControl(null, [Validators.required]),
      //altura
      h: new FormControl(null, [Validators.required]),

      //aqui iran los distintos datos de las distintas bifurcaciones
      contenidos: this.formBuilder.array([
        this.formBuilder.group({
          //validaciones, todos los datos tienen que ser ingresados
          //longitud
          l: new FormControl(null, [Validators.required]),
          //diametro
          d: new FormControl(null, [Validators.required]),
          //coefiente de rugosidad
          ks: new FormControl(null, [Validators.required]),
          //coeficiente global de perdidas menores
          k: new FormControl(null, [Validators.required]),
        }),
      ]),
    });
  }

  //ngOnInit: lo que se ejcuta siempre
  ngOnInit(): void {}

  //metodo para subir datos del formulario

  public onSubmit() {
    //verificamos si el formulario esta validado
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
    //añadiendo bifurcaciones

    let contenidos = this.formBuilder.group({
      //validaciones, todos los datos tienen que ser ingresados
      //longitud
      l: new FormControl(null, [Validators.required]),
      //diametro
      d: new FormControl(null, [Validators.required]),
      //coefiente de rugosidad
      ks: new FormControl(null, [Validators.required]),
      //coeficiente global de perdidas menores
      k: new FormControl(null, [Validators.required]),
    });

    //ingresando nuevos datos de formulario al arryForm
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
