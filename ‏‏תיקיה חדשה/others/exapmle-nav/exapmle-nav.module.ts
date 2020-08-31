import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExapmleNavPageRoutingModule } from './exapmle-nav-routing.module';

import { ExapmleNavPage } from './exapmle-nav.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExapmleNavPageRoutingModule
  ],
  declarations: [ExapmleNavPage]
})
export class ExapmleNavPageModule {}
