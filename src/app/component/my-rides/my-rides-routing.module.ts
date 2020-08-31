import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRidesPage } from './my-rides.page';
import { RidesService } from 'src/app/services/Rides/rides.service';

const routes: Routes = [
  {
    path: '',
    component: MyRidesPage ,canActivate:[RidesService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRidesPageRoutingModule {}
