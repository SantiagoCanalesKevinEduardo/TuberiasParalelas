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

  p: number;
  u: number;
  H: number;
  //viscocidad cinetica
  viscocidad: number;

  //gravedad
  g: number = 9.81;

  //datos a calcular
  //todos los caudales de cada itereacion
  Qs: Number[] = [];
  //caudal total
  Qt: number;

  //Arrays para atrapar todos los datos de cada bifucación
  //longitudes
  Ls: number[] = [];
  //diametros
  Ds: number[] = [];
  //coeficientes de rugosidad
  Kss: number[] = [];
  //coeficiente global de perdidas menores
  Ks: number[] = [];

  //variable que verificara si el ejercicio ha sido correctamente ingresado
  terminado = false;

  //Aqui se almacenran todos los datos de los formularios
  datosArray: FormArray;
  datos: FormGroup;

  //sirve para inicalizar datos
  constructor(
    private formBuilder: FormBuilder,
    private servicioDisenio: DisenioService
  ) {}

  //aqui se incializa todo al inicio
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
    //llamando al servicio donde se almacenan los datos del formulario
    this.datos = this.servicioDisenio.formDatosDisenio;

    //Inializando con datos generales
    this.u = this.servicioDisenio.formDatosDisenio.get('u')?.value;
    this.p = this.servicioDisenio.formDatosDisenio.get('p')?.value;
    this.H = this.servicioDisenio.formDatosDisenio.get('h')?.value;

    //datos de cada bifurcación
    this.datosArray = this.servicioDisenio.formDatosDisenio.get(
      'contenidos'
    ) as FormArray;

    //a traves de un for inicializaremos todos los arrays que creamos
    for (let i = 0; i < this.datosArray.controls.length; i++) {
      //longitudes
      this.Ls.push(this.datosArray.controls[i].value.l);
      //diametros
      this.Ds.push(this.datosArray.controls[i].value.d);
      //coeficientes de rugosidad
      this.Kss.push(this.datosArray.controls[i].value.ks);
      //coeficiente global de perdidas menores
      this.Ks.push(this.datosArray.controls[i].value.k);
    }
  }

  //funcion que resulvera el ejercicio
  calcularDatos() {
    //hallar viscocidad= u/densidad
    this.viscocidad = this.u / this.p;

    //resolviendo por formulas todos los datos de las diferentes bifurcaciones
    //con la ayuda de un for
    //variable que servira para iterear en un while
    let x: number;
    for (let i = 0; i < this.Ls.length; i++) {
      //inicializando data ("es donde se almacenaran todos los datos que iran en la tabla")
      //estos datos se hallan iterando
      this.data = {
        Hf: [],
        Velocidad: [],
        //Hf +1
        Hfs: [],
        Hm: [],
        //area
        A: [],
        //caudal
        Q: [],
      };
      //ingresamos H ya que esa será nuestro primer Hf
      this.data.Hf.push(this.H);
      //inicalizamos x
      x = 0;

      //usamos do ya que es necesario que el programa se ejecute al menos una vez
      do {
        //Hallando  Velocidad
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
        //Hallando Hm
        this.data.Hm.push(
          (this.Ks[i] * Math.pow(this.data.Velocidad[x], 2)) / (2 * this.g)
        );
        //hallando hf +1
        this.data.Hfs.push(this.H - this.data.Hm[x]);
        //hallando area
        this.data.A.push((Math.PI * Math.pow(this.Ds[i], 2)) / 4);
        //hallando caudales
        this.data.Q.push(
          (Math.PI * Math.pow(this.Ds[i], 2) * this.data.Velocidad[x]) / 4
        );

        //el siguiente hf será hf+1 por ello ingresamos el dato a la lista
        this.data.Hf.push(this.data.Hfs[x]);

        //en cada itereración el contador aumenta +1
        x++;
        //todo esto se ejecutara mientras que hf y hf+1 su diferencia sea mayor a 0.00000001
      } while (
        Math.abs(this.data.Hf[x - 1] - this.data.Hfs[x - 1]) > 0.00000001
      );
      //aqui se guadaran todos los datos que estan en el array data
      //en el cual se guardaran todas las itereaciones
      this.datosIteracion.push(this.data);
      //Aqui se guardaran todos los caudales
      this.Qs.push(this.data.Q[this.data.Q.length - 1]);
    }
    //variable que me ayudara a sumar todos los caudales
    let suma = 0;
    //cambiamos la variables para determinar que la solucion ha terminado
    this.terminado = true;
    //mediante un forEach haremos la suma de caudales
    this.Qs.forEach(function (q) {
      suma += q as number;
    });

    //el caudal total sera la suma
    this.Qt = suma;
  }
}
