import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RidesPageRoutingModule } from './component/rides/rides-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageModule } from '../app/component/home/home.module';
import { HomePage } from './component/home/home.page';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app-routing.module';
import { NavBarPage } from '../app/component/nav-bar/nav-bar.page';
import { NavBarPageModule } from '../app/component/nav-bar/nav-bar.module';
import { from } from 'rxjs';
import { SMS } from '@ionic-native/sms/ngx';
import { AuthInterceptor } from './auth.interceptor';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent,
    // NavBarPageModule, NavBarPage
    // HomePage  ,

  ],

  entryComponents: [HomePage,NavBarPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule,
    HomePageModule,
    NavBarPageModule,
    // NavBarPage

  ],
  providers: [
    StatusBar,
    AlertController,
    SplashScreen,
    SMS,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

    // {
    //   provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

