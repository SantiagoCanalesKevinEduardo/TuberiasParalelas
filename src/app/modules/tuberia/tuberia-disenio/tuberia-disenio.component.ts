import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IDisenio } from 'src/app/shared/components/form-disenio/disenio.metadata';
import { DisenioService } from 'src/app/shared/services/disenio.service';

@Component({
  selector: 'app-tuberia-disenio',
  templateUrl: './tuberia-disenio.component.html',
  styleUrls: ['./tuberia-disenio.component.scss'],
})
export class TuberiaDisenioComponent implements OnInit {
  @Input() data: IDisenio;
  datosIteracion: IDisenio[];

  //datos generales para resolver el ejercicio
  n: number;
  p: number;
  u: number;
  H: number;
  viscocidad: number;
  g: number = 9.81;

  //datos a calcular
  Qs: Number[] = [];
  Qt: number;

  //Arrays para atrapar todos los datos de cada bifucación
  Ls: number[] = [];
  Ds: number[] = [];
  Kss: number[] = [];
  Ks: number[] = [];

  //Arrays
  terminado = false;

  datosArray: FormArray;
  datos: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private servicioDisenio: DisenioService
  ) {}

  ngOnInit(): void {
    this.datosIteracion = [];
    this.resolver();
  }

  //sacar datos
  resolver() {
    if (this.servicioDisenio.formDatosDisenio != null) {
      this.guardarDatos();
      this.calcularDatos();
    } else {
    }
  }

  //guardar datos en Arrays

  guardarDatos() {
    //datos generales

    this.datos = this.servicioDisenio.formDatosDisenio;
    this.n = this.servicioDisenio.formDatosDisenio.get('n')?.value;
    this.u = this.servicioDisenio.formDatosDisenio.get('u')?.value;
    this.p = this.servicioDisenio.formDatosDisenio.get('p')?.value;
    this.H = this.servicioDisenio.formDatosDisenio.get('h')?.value;

    //datos de cada bifurcación

    this.datosArray = this.servicioDisenio.formDatosDisenio.get(
      'contenidos'
    ) as FormArray;

    for (let i = 0; i < this.datosArray.controls.length; i++) {
      this.Ls.push(this.datosArray.controls[i].value.l);
      this.Ds.push(this.datosArray.controls[i].value.d);
      this.Kss.push(this.datosArray.controls[i].value.ks);
      this.Ks.push(this.datosArray.controls[i].value.k);
    }
  }

  calcularDatos() {
    //hallar viscocidad
    this.viscocidad = this.u / this.p;
    //tuberias Velocidad
    console.log('veces:' + this.Ls.length);
    let x: number;
    for (let i = 0; i < this.Ls.length; i++) {
      this.data = {
        Hf: [],
        Velocidad: [],
        Hfs: [],
        Hm: [],
        A: [],
        Q: [],
      };
      this.data.Hf.push(this.H);
      x = 0;
      do {
        console.log(this.data.Velocidad.length);
        //hm
        //Velocidad
        this.data.Velocidad.push(
          ((-2 * Math.sqrt(2 * this.g * this.Ds[i] * this.data.Hf[x])) /
            Math.sqrt(this.Ls[i])) *
            Math.log10(
              this.Kss[i] / (this.Ds[i] * 3.7) +
                (2.51 * this.viscocidad * Math.sqrt(this.Ls[i])) /
                  (this.Ds[i] *
                    Math.sqrt(2 * this.g * this.Ds[i] * this.data.Hf[x]))
            )
        );
        this.data.Hm.push(
          (this.Ks[i] * Math.pow(this.data.Velocidad[x], 2)) / (2 * this.g)
        );

        this.data.Hfs.push(this.H - this.data.Hm[x]);
        this.data.A.push((Math.PI * Math.pow(this.Ds[i], 2)) / 4);
        this.data.Q.push(
          (Math.PI * Math.pow(this.Ds[i], 2) * this.data.Velocidad[x]) / 4
        );
        console.log('que esta pasando: ' + this.data.Hfs[x]);
        this.data.Hf.push(this.data.Hfs[x]);

        x++;
      } while (
        Math.abs(this.data.Hf[x - 1] - this.data.Hfs[x - 1]) > 0.00000001
      );

      this.datosIteracion.push(this.data);
      this.Qs.push(this.data.Q[this.data.Q.length - 1]);
    }

    let suma = 0;

    this.terminado = true;
    this.Qs.forEach(function (q) {
      suma += q as number;
    });

    this.Qt = suma;
  }
}
