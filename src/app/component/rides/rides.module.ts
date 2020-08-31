import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidesPageRoutingModule } from './rides-routing.module';

import { RidesPage } from './rides.page';
import { RidePageModule } from '../ride/ride.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RidesPageRoutingModule,
    RidePageModule

  ],
  declarations: [RidesPage]
})
export class RidesPageModule {}
