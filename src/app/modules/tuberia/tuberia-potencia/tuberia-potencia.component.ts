import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IPotencia } from 'src/app/shared/components/form-potencia/potenica.metadata';
import { DisenioService } from 'src/app/shared/services/disenio.service';

@Component({
  selector: 'app-tuberia-potencia',
  templateUrl: './tuberia-potencia.component.html',
  styleUrls: ['./tuberia-potencia.component.scss'],
})
export class TuberiaPotenciaComponent implements OnInit {
  //el input me permite inicializar una variable en otra clase
  @Input() data: IPotencia = {
    Hf: [],
    Velocidad: [],
    Hfs: [],
    Hm: [],
    A: [],
    Q: [],
  };

  //Aqui se almacenaran todas las iteraciones de las potencias
  datosIteracion: IPotencia[] = [];

  //datos generales para resolver el ejercicio

  p: number;
  u: number;
  P: number;
  Q: number;

  //datos necesarios
  viscocidad: number;
  //gravedad
  g: number = 9.81;
  //altura
  H1: number;
  velocidad: number;
  //reynolds
  Re: number;
  //f
  f: number;
  //calculo de las perdidas

  //perdidas
  hf1: number;
  hm1: number;
  HR: number;
  //aqui almacenaremos todas las potencias y alturas halladas en los ejerciccios
  Hi: number[] = [];
  Pi: number[] = [];

  //QSSS
  Q1: number;
  D1: number;
  H: number;

  //datos a calcular
  Qs: number[] = [];
  Qt: number;

  //Arrays para atrapar todos los datos de cada bifucación
  Ls: number[] = [];
  Ds: number[] = [];
  Kss: number[] = [];
  Ks: number[] = [];

  //dato que sirve para determinar que el ejercicio ya esta completado
  terminado = false;

  //Arrays
  datosArray: FormArray;

  //aqui se almacenaran todos los datos ingresados en los formularios
  datos: FormGroup;

  //todo se incializa
  constructor(
    private formBuilder: FormBuilder,
    private servicioDisenio: DisenioService
  ) {}

  ngOnInit(): void {
    this.resolver();
  }

  //sacar datos del servicio
  resolver() {
    if (this.servicioDisenio.formDatosDisenio != null) {
      this.guardarDatos();
      this.calcularDatosParte1();
      this.calcularDatosParte2();
      this.calcularDatosParte3();
    } else {
      console.log('error!');
    }
  }

  //guardar datos en Arrays

  guardarDatos() {
    //datos generales

    this.datos = this.servicioDisenio.formDatosDisenio;
    this.p = this.servicioDisenio.formDatosDisenio.get('p')?.value;
    this.u = this.servicioDisenio.formDatosDisenio.get('u')?.value;
    this.P = this.servicioDisenio.formDatosDisenio.get('P')?.value;
    this.Q = this.servicioDisenio.formDatosDisenio.get('Q')?.value;

    //datos de cada bifurcación

    this.datosArray = this.servicioDisenio.formDatosDisenio.get(
      'contenidos'
    ) as FormArray;

    //ingresando todos los datos en arrays para hacerlos mas faciles de manejar
    for (let i = 0; i < this.datosArray.controls.length; i++) {
      this.Ls.push(this.datosArray.controls[i].value.l);
      this.Ds.push(this.datosArray.controls[i].value.d);
      this.Kss.push(this.datosArray.controls[i].value.ks);
      this.Ks.push(this.datosArray.controls[i].value.k);
    }
  }

  //dividiremos la resolución en 3 partes
  //La primera hallara los datos de la bifurcación 1
  calcularDatosParte1() {
    //calculando la viscocidad cinetica
    this.viscocidad = this.u / this.p;

    //calculando altura H1
    this.H1 = this.P / (this.p * this.g);

    //guardando la primera altura en una lista
    this.Hi.push(this.H1);

    //guardando la potencia de la primera tuberia en una lista

    //calculando Q1 o caudal 1
    this.D1 = 0;

    for (let i = 0; i < this.Ls.length; i++) {
      // suma de las Divisiones
      this.D1 += Math.pow(this.Ds[i], 5 / 2) / Math.sqrt(this.Ls[i]);
    }
    this.Q1 =
      (this.Q * Math.pow(this.Ds[0], 5 / 2)) / Math.sqrt(this.Ls[0]) / this.D1;
    //insertando valor de Q1

    this.Qs.push(this.Q1);

    //calculando primera velocidad
    this.velocidad = this.Q1 / ((Math.PI * Math.pow(this.Ds[0], 2)) / 4);

    //calculando Reynold
    this.Re = (this.velocidad * this.Ds[0]) / this.viscocidad;

    //hallando el valor de f
    this.f = 0.01;
    let ecuacion = 0;
    while (ecuacion < 0.5) {
      ecuacion = -(
        Math.sqrt(this.f) *
        Math.log10(
          this.Kss[0] / (3.7 * this.Ds[0]) +
            2.51 / (this.Re * Math.sqrt(this.f))
        )
      );
      this.f += 0.00001;
    }

    //calculo de las perdidas
    //perdidas por fricción
    this.hf1 =
      (this.f * (this.Ls[0] / this.Ds[0]) * Math.pow(this.velocidad, 2)) /
      (2 * this.g);
    //perdidas menores

    this.hm1 = (this.Ks[0] * Math.pow(this.velocidad, 2)) / (2 * this.g);
    //sumatoria de perdidas == perdidas totales
    this.HR = this.hf1 + this.hm1;
  }

  calcularDatosParte2() {
    //Datos que son necesarios para la tabla de datos

    let x: number;

    for (let i = 1; i < this.Ls.length; i++) {
      //es necesario incializar la tabla
      this.data = {
        Hf: [],
        Velocidad: [],
        Hfs: [],
        Hm: [],
        A: [],
        Q: [],
      };
      // suma de las Divisiones

      //calculo de HF
      this.data.Hf.push(this.HR);
      x = 0;

      do {
        console.log(this.data.Velocidad.length);

        //calculando la Velocidad

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

        //calculando las perdidas menores
        this.data.Hm.push(
          (this.Ks[i] * Math.pow(this.data.Velocidad[x], 2)) / (2 * this.g)
        );

        //calculando las perdidas por fricción (hf+1)
        this.data.Hfs.push(this.HR - this.data.Hm[x]);
        //calculando el área
        this.data.A.push((Math.PI * Math.pow(this.Ds[i], 2)) / 4);

        //calculando el caudal
        this.data.Q.push(this.data.A[x] * this.data.Velocidad[x]);

        //insertando dato de perdida por fricción
        this.data.Hf.push(this.data.Hfs[x]);

        x++;
      } while (Math.abs(this.data.Hf[x - 1] - this.data.Hfs[x - 1]) > 0.00001);

      //guardando los datos de todas las tablas en una lista
      console.log(this.data);
      this.datosIteracion.push(this.data as IPotencia);
      //guardando todos los caudales en una lista
      this.Qs.push(this.data.Q[this.data.Q.length - 1]);
    }

    //con esto recorremos toda la lista de Caudales y las sumamos
    let suma = 0;

    this.terminado = true;
    this.Qs.forEach(function (q) {
      suma += q as number;
    });
    this.Qt = suma;

    //en this Qt se almacenaran todas las variables
  }

  calcularDatosParte3() {
    //Metodo usado para hallar las potencias de las bifuraciones, sin contar la primera
    console.log(this.Ls.length - 1);
    for (let i = 0; i < this.Ls.length - 1; i++) {
      this.Hi.push(this.Hi[i] - this.HR);

      this.Pi.push(this.g * this.p * this.Hi[i + 1]);
    }
  }
}
