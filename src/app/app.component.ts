import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CacheService } from './services/cache.service';

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
    "/send-an-audio"            : "alert-tab",
    "/send-a-message"           : "alert-tab",
    "/homescreen"               : "home-tab",
    "/volunteers"               : "volunteer-tab",
    "/knowledge-center"         : "nav-tab",
    "/online-counselors"        : "chat-tab",
    "/video-center"             : "nav-tab",
    "/audio-center"             : "nav-tab",
    "/video-info"               : "nav-tab",
    "/watch-video"              : "nav-tab",
    "/articles"                 : "nav-tab",
    "/view-article"             : "nav-tab",
  };

  static accountInformation : any = {};

  static defaultNavigation = [];
  static isLoggedIn : boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private cache : CacheService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // load to local storage 
      this.cache.loadAll();

    });
  }
}
