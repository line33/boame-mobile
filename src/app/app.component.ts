import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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

  constructor(
    private platform: Platform,
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
