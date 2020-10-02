import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GoBackComponent } from './components/go-back/go-back.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ComponentModule } from './components/component.module';
import { NetworkService } from './services/network.service';
import { IonicStorageModule } from '@ionic/storage';
import { AlertComponent } from './components/alert/alert.component';
import { RouterService } from './services/router.service';
import { CacheService } from './services/cache.service';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { AudioService } from './services/audio.service';
import { VideoService } from './services/video.service';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config : SocketIoConfig = {url : 'wss://www.mediaccess.com.ng/', options : { 
  secure: true, transports: ['websocket'], port: 8082
}};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    SocketIoModule.forRoot(config), 
    IonicModule.forRoot(),  
    IonicStorageModule.forRoot(), 
    AppRoutingModule, 
    ComponentModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoBackComponent,
    LoaderComponent,
    NetworkService,
    AlertComponent,
    RouterService,
    CacheService,
    UniqueDeviceID,
    AudioService,
    VideoService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
