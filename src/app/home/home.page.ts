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
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

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

  isLoggedIn : boolean = false;
  users : any = { 
      id: '', 
      name: '', 
      email: '', 
      picture: { 
          data: { 
              url: '' 
          } 
      } 
  };

  constructor(
    private router : Router, 
    private loader : LoaderComponent, 
    private network : NetworkService, 
    private storage : Storage,
    private alert : AlertComponent,
    private chatService : ChatService,
    private notification : NotificationService,
    private fb : Facebook) {
    // do we have a username
    this.storage.get('boame_username').then((username:any)=>{
      if (username !== null) this.username = username;
    }); 

    // get facebook status
    this.getFacebookStatus();
  }

  getFacebookStatus()
  {
    this.fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if (res.status === 'connect') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
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
            this.loginSuccessful(res);
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

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {

        this.network.post('service/auth/login-with-facebook', {
          id          : res.id,
          name        : res.name,
          email       : res.email,
          picture     : res.picture.data.url,
          platformid  : 2
        }).then((response:any) => {

          // are we good ??
          if (response.data.status == 'error')
          {
            this.loader.hide(()=>{
              this.alert.show(response.data.message);
            });
          } 
          else
          {
            this.loader.hide(()=>{
              this.loginSuccessful(response);
            });
          }
        });

      })
      .catch(e => {
        this.loader.hide(()=>{
          this.alert.show('Could not fetch account information from facebook');
        });
    });
  }

  loginWithFb()
  {
    this.loader.show();
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if (res.status === 'connected') {
        this.getUserDetail(res.authResponse.userID);
      }
    })
    .catch(e => {
      this.loader.hide(()=>{
        this.alert.show('Error logging into Facebook');
      });
    });
  }

  loginSuccessful(res:any)
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

}
