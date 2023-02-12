import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import * as fromComponents from './components';

//servicios
import { DisenioService } from './services/disenio.service';

import { GeneralService } from './services/general.service';
import { FormPotenciaComponent } from './components/form-potencia/form-potencia.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  declarations: [...fromComponents.components, FormPotenciaComponent],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ...fromComponents.components,
  ],
  providers: [DisenioService, GeneralService],
})
export class SharedModule {}
