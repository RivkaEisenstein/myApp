import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HttpClientModule}from '@angular/common/http';
// import {NavPageRoutingModule} from '../nav/nav-routing.module';
// import { NavbarComponentModule }from 
@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,

  ],
   providers: [  
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ], 
  declarations: [HomePage],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
