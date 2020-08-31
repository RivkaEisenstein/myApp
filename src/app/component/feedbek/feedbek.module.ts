import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbekPageRoutingModule } from './feedbek-routing.module';

import { FeedbekPage } from './feedbek.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedbekPageRoutingModule
  ],
  declarations: [FeedbekPage]
})
export class FeedbekPageModule {}
