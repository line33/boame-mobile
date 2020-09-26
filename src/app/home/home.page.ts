import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { Storage } from '@ionic/storage';
import { AlertComponent } from '../components/alert/alert.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent) content: IonContent;

  username : string = '';
  password : string = '';

  constructor(
    private router : Router, 
    private loader : LoaderComponent, 
    private network : NetworkService, 
    private storage : Storage,
    private alert : AlertComponent) {
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

      }
    });
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    AppComponent.isLoggedIn = false;
    AppComponent.accountInformation = {};
    this.scrollToTop();
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

            // save the username for next time
            this.storage.set('boame_username', this.username);

            // reset password
            this.password = '';

            // redirect user
            this.router.navigate(['/homescreen']);
          }

          // hide loader
          this.loader.hide();
        });
      }); 
    }
  }

}
