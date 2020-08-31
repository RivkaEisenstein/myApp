import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlobalErrorHandlerPageRoutingModule } from './global-error-handler-routing.module';

// import { GlobalErrorHandlerPage } from './global-error-handler.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalErrorHandlerPageRoutingModule
  ],
  // declarations: [GlobalErrorHandlerPage]
})
export class GlobalErrorHandlerPageModule {}
