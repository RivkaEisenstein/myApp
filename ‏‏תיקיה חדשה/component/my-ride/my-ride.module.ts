import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonNav } from '@ionic/angular';

import { IonicModule } from '@ionic/angular';

import { MyRidePageRoutingModule } from './my-ride-routing.module';
import {HomePageModule}from '../home/home.module'
import { MyRidePage } from './my-ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRidePageRoutingModule,
    HomePageModule
  ],
  declarations: [MyRidePage],
  entryComponents:[IonNav],
  providers: [IonNav]
})
export class MyRidePageModule {}
