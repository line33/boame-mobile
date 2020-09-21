import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';

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
  };

  static defaultNavigation = [];
  static isLoggedIn : boolean = false;

  constructor(
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }
}
