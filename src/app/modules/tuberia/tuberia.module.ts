import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { TuberiaDisenioComponent } from './tuberia-disenio/tuberia-disenio.component';
import { TuberiaPotenciaComponent } from './tuberia-potencia/tuberia-potencia.component';
import { TuberiaPrincipalComponent } from './tuberia-principal/tuberia-principal.component';
import { TuberiaRoutingModule } from './tuberia-routing.module';

@NgModule({
  declarations: [
    TuberiaDisenioComponent,
    TuberiaPotenciaComponent,
    TuberiaPrincipalComponent,
  ],
  imports: [SharedModule, TuberiaRoutingModule],
})
export class TuberiaModule {}
