import { Component, QueryList, ViewChildren } from '@angular/core';
import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Socket } from 'ngx-socket-io';

declare var cordova;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  static menuTarget = {
    "/become-a-volunteer"       : "volunteer-tab",
    "/report-case"              : "alert-tab",
    "/complete-volunteer-reg"   : "volunteer-tab",
    "/send-a-video"             : "alert-tab",
    "/submit-audio"             : "alert-tab",
    "/send-an-audio"            : "alert-tab",
    "/send-a-message"           : "alert-tab",
    "/homescreen"               : "home-tab",
    "/volunteers"               : "volunteer-tab",
    "/volunteer-info"           : "volunteer-tab",
    "/knowledge-center"         : "nav-tab",
    "/online-counselors"        : "chat-tab",
    "/chat-list"                : "chat-tab",
    "/select-counselors"        : "chat-tab",
    "/video-center"             : "nav-tab",
    "/audio-center"             : "nav-tab",
    "/video-info"               : "nav-tab",
    "/watch-video"              : "nav-tab",
    "/articles"                 : "nav-tab",
    "/view-article"             : "nav-tab",
    "/profile"                  : "profile-tab",
    "/cases-assigned"           : "cases-tab",
    "/view-case-assigned"       : "cases-tab",
  };

  static accountInformation : any = null;

  static defaultNavigation = [];
  static isLoggedIn : boolean = false;
  static navigatedData : any = {};
  static storageUrl : string = '';
  static redirectTo : string = '';
  static currentChatId : any = 0;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private backgroundMode : BackgroundMode,
    private alertcrtl : AlertController,
    private socket : Socket
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.backButtonEvent();

      this.socket.on('connect', () => {
        this.socket.emit('');
      });

      this.backgroundMode.on('activate').subscribe(() => {
        // this.backgroundMode.disableWebViewOptimizations();

        // cordova.plugins.backgroundMode.on('activate', () => {
        //   console.log('ACTIVATE background mode');
        //   cordova.plugins.backgroundMode.disableWebViewOptimizations();
        //   cordova.plugins.backgroundMode.disableBatteryOptimizations(); // <- HERE
        // });

      });
      
    });

    this.platform.resume.subscribe(() => {
      //this.socket.connect();
      console.log('SOCKET SHOULD RESUME HERE');
    });
  }

  // active hardware back button
  backButtonEvent() {
    this.platform.backButton.subscribeWithPriority(-1, () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {

          if (outlet && outlet.canGoBack()) {
            outlet.pop();
          }
          else
          {
            this.promptClose();
          }
        });
    });
  }

  async promptClose()
  {
     const al = await this.alertcrtl.create({
       header : 'Exit application',
       message : 'Are you sure you want to exit application?',
       buttons : [
         {
           role : 'yes',
           text : 'Yes',
           handler : () => {
              navigator['app'].exitApp();
           }
         },
         {
           role : 'cancel',
           text : 'No'
         }
       ]
     });

     al.present();
  }
}
