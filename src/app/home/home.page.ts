import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { Storage } from '@ionic/storage';
import { AlertComponent } from '../components/alert/alert.component';
import { HomescreenPage } from '../homescreen/homescreen.page';
import { ChatService } from '../services/chat.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent) content: IonContent;

  username : string = '';
  password : string = '';
  static cacheLoaded : boolean = false;
  validation : any = {
    error : {},
    rules : {
      username : [2,'You must provide a valid username'],
      password : [4, 'Your password must not be empty or less than 4 characters'],
    }
  };

  constructor(
    private router : Router, 
    private loader : LoaderComponent, 
    private network : NetworkService, 
    private storage : Storage,
    private alert : AlertComponent,
    private chatService : ChatService,
    private notification : NotificationService) {
    // do we have a username
    this.storage.get('boame_username').then((username:any)=>{
      if (username !== null) this.username = username;
    }); 
  }

  ngOnInit() {
  
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    if (AppComponent.accountInformation !== null) this.chatService.nowOffline();
    AppComponent.isLoggedIn = false;
    AppComponent.accountInformation = null;
    this.scrollToTop();

    if (HomePage.cacheLoaded === false)
    {
      HomePage.cacheLoaded = true;
    }
  }

  login()
  {
    const validate = this.network.inputValid({
      username : this.username,
      password : this.password
    }, this.validation);

    // check username and password
    if (validate.ok === true)
    {
      this.loader.show(()=>{
        // make query
        this.network.post('service/auth/login', {
          platformid : 2,
          username : this.username,
          password : this.password
        }).then((res:any)=>{

          if (res.data.status == 'error')
          {
            this.alert.show(res.data.message); 
          }
          else
          {
            // log user in
            AppComponent.isLoggedIn = true;
            AppComponent.accountInformation = res.data;

            // get navs
            let navigation : any = [];

            // run through the list of navs
            res.data.navigations.forEach((nav:any)=>{
              navigation.push(nav.nav_tag);
            });

            // set now
            HomescreenPage.allowNavigation = navigation;

            // save the username for next time
            this.storage.set('boame_username', this.username);

            // reset password
            this.password = '';

            // get redirect page
            let redirectTo : string = AppComponent.redirectTo, gotoPage : string = '/homescreen';

            // check if redirectTo is not empty
            if (redirectTo !== '')
            {
              gotoPage = redirectTo;
              AppComponent.redirectTo = '';
            }

            // prepare notification
            this.notification.prepareNotification();

            // redirect user
            this.router.navigate([gotoPage]);
          }

          // hide loader
          this.loader.hide();
        });
      }); 
    }
    else
    {
      this.validation.error = validate.error;
    }
  }

}
