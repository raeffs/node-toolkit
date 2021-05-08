import { NgModule } from '@angular/core';
import { FromRouteParametersPipe } from './from-query-parameters.pipe';
import { FromRouteDataPipe } from './from-route-data.pipe';
import { FromQueryParametersPipe } from './from-route-parameters.pipe';

@NgModule({
  declarations: [FromQueryParametersPipe, FromRouteDataPipe, FromRouteParametersPipe],
  exports: [FromQueryParametersPipe, FromRouteDataPipe, FromRouteParametersPipe],
})
export class RouterModule {}
