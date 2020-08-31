import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ride } from '../../modals/Ride.modal';
import { RidesPage } from './rides.page';
import { RidesService }from '../../services/Rides/rides.service';

const routes: Routes = [
  {
    path: '',
    component: RidesPage
    ,canActivate:[RidesService]
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
  },
  { path: 'ride/:id', loadChildren: '../ride/ride.module#RideModule' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidesPageRoutingModule {}
