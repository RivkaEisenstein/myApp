import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomePage } from './component/home/home.page';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./component/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home',
    component: HomePage
  },

  {
    path: 'login',
    loadChildren: () => import('./component/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./component/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'nav-bar',
    loadChildren: () => import('./component/nav-bar/nav-bar.module').then(m => m.NavBarPageModule)
  },
  {
    path: 'my-ride',
    loadChildren: () => import('./component/my-ride/my-ride.module').then(m => m.MyRidePageModule)
  },
  {
    path: 'my-rides',
    loadChildren: () => import('./component/my-rides/my-rides.module').then(m => m.MyRidesPageModule)
  },
  // {
  //   path: 'ride',
  //   loadChildren: () => import('./component/ride/ride.module').then(m => m.RidePageModule)
  // },
  {
    path: 'ride/:id',
    loadChildren: () => import('./component/ride/ride.module').then(m => m.RidePageModule)
  },
  {
    path: 'global-error-handler',
    loadChildren: () => import('./global-error-handler/global-error-handler.module').then( m => m.GlobalErrorHandlerPageModule)
  }
  // { path: 'ride/:id', loadChildren: './component/ride/ride.module#RideModule' }

  // { path: 'home', loadChildren: './component/home/home.module#HomeModule' },

  // {
  //   path: '',
  //   redirectTo: './Component/login/login.module',
  //   pathMatch: 'full'
  // },

];
@NgModule({
  imports: [

    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), HttpClientModule,
    RouterModule.forChild(routes)

  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
