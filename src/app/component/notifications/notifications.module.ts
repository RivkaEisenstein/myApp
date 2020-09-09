
  
import { NgModule, ErrorHandler } from '@angular/core';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from '../../services/notifications/messaging.service';
import { environment } from '../../../environments/environment';
import {GlobalErrorHandler}from './global-error-handler'
//import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NotificationsPage } from './notifications.page';
import { AsyncPipe } from '../../../../node_modules/@angular/common';
import {NotificationsPageRoutingModule} from './notifications-routing.module'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';


@NgModule({
  declarations: [
    [NotificationsPage]
  ],
  imports: [
    NotificationsPageRoutingModule,
    IonicModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  exports:[NotificationsPage],
  providers: [MessagingService,AsyncPipe,{provide: ErrorHandler, useClass: GlobalErrorHandler}],
})
export class NotificationsPageModule { }

