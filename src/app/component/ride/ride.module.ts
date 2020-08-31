import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RidePageRoutingModule } from './ride-routing.module';
// import {PopoverComponent} from '../../popover/popover.component';
import { RidePage } from './ride.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // PopoverComponent,
    RidePageRoutingModule
  ],
  declarations: [RidePage]
})
export class RidePageModule {}
