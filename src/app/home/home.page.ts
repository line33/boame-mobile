import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { Storage } from '@ionic/storage';
import { AlertComponent } from '../components/alert/alert.component';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { CacheService } from '../services/cache.service';
import { HomescreenPage } from '../homescreen/homescreen.page';

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

  constructor(
    private router : Router, 
    private loader : LoaderComponent, 
    private network : NetworkService, 
    private storage : Storage,
    private alert : AlertComponent,
    private uniqueDeviceID: UniqueDeviceID,
    private cacheService : CacheService) {
    // do we have a username
    this.storage.get('boame_username').then((username:any)=>{
      if (username !== null) this.username = username;
    }); 
  }

  ngOnInit() {
    
    // generate device hash for the first time if not generated
    this.storage.get('boame_device_hash').then((hash:any)=>{

      if (hash == null)
      {
        // generate one
        //const hash = 
        this.uniqueDeviceID.get()
        .then((uuid: any) => {
          this.storage.set('boame_device_hash', uuid);
        })
        .catch(() => {
          const ID = () => {
            let array = new Uint32Array(8)
            window.crypto.getRandomValues(array)
            let str = ''
            for (let i = 0; i < array.length; i++) {
              str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4)
            }
            return str
          };

          // Set the ID
          this.storage.set('boame_device_hash', ID());
        });
      }
    });
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    AppComponent.isLoggedIn = false;
    AppComponent.accountInformation = null;
    this.scrollToTop();

    if (HomePage.cacheLoaded === false)
    {
      // load to local storage 
      this.cacheService.loadAll();
      HomePage.cacheLoaded = true;
    }
  }

  login()
  {
    // check username and password
    if (this.network.inputValid('.loginaftersplash'))
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

            // redirect user
            this.router.navigate([gotoPage]);
          }

          // hide loader
          this.loader.hide();
        });
      }); 
    }
  }

}
