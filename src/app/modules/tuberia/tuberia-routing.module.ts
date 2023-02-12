import { TuberiaPotenciaComponent } from './tuberia-potencia/tuberia-potencia.component';
import { TuberiaDisenioComponent } from './tuberia-disenio/tuberia-disenio.component';
import { TuberiaPrincipalComponent } from './tuberia-principal/tuberia-principal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TuberiaPrincipalComponent,
  },
  {
    path: 'disenio',
    component: TuberiaDisenioComponent,
  },
  {
    path: 'potencia',
    component: TuberiaPotenciaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuberiaRoutingModule {}
