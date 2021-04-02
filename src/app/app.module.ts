import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
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
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { File } from '@ionic-native/File/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NotificationService } from './services/notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Chooser } from '@ionic-native/chooser/ngx';
import { ToastController } from '@ionic/angular';
import { Media } from '@ionic-native/media/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { VolunteerHeaderComponent } from './components/volunteer-header/volunteer-header.component';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Camera } from '@ionic-native/camera/ngx';


const config : SocketIoConfig = {url : 'ws://beta.wekiwork.com/', options : { 
  secure: true, transports: ['websocket'], port: 8083, timeout : 2000
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
    NotificationService,
    LocalNotifications,
    MediaCapture,
    File,
    FileTransfer,
    CallNumber,
    BackgroundMode,
    ActionSheetController,
    ToastController,
    Chooser,
    Media,
    FilePath,
    ImagePicker,
    Facebook,
    VolunteerHeaderComponent,
    Diagnostic,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
