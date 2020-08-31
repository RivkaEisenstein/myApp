import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavBarPage } from './nav-bar.page';

const routes: Routes = [
  {
    path: '',
    component: NavBarPage
  },
  {
    path: 'login',
    loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rides',
    loadChildren: () => import('../rides/rides.module').then( m => m.RidesPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'myRide',
    loadChildren: () => import('../my-ride/my-ride.module').then( m => m.MyRidePageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavBarPageRoutingModule {}
