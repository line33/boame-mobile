import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AppComponent } from '../app.component';
import { ActionSheetController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  dataPassed : any = null;

  constructor(public router : Router, public activated : ActivatedRoute,
    private actionSheet : ActionSheetController, private call : CallNumber) { }

  // route
  route(path : string, data : any = {})
  {
    const navigationExtra : NavigationExtras = {
      state : {
        data : data
      }
    };

    // push to 
    AppComponent.navigatedData = data;

    // route now  
    this.router.navigate([path], navigationExtra);

    // return
    return null;
  }

  // get route data
  getData(callback = null)
  {
    // load callback
    if (callback !== null) callback.call(this, AppComponent.navigatedData);

    // get the data
    this.dataPassed = AppComponent.navigatedData;

    // clear now
    AppComponent.navigatedData = {};

    // return data passed
    return this.dataPassed;
  }

  // show report action sheet
  async showReportSheet()
  {
    const actionSheet = await this.actionSheet.create({
      header: 'Report a Case',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Make a Phone call',
        role: 'destructive',
        icon: 'call',
        cssClass : 'actionSheetIcon',
        handler: () => {

          this.call.callNumber('+233800111222', false)
          .then(res => console.log('Launched dialer!', res))
          .catch(err => console.log('Error launching dialer', err));

        }
      }, {
        text: 'Send a Video',
        icon: 'videocam',
        cssClass : 'actionSheetIcon',
        handler: () => {
          this.route('/send-a-video');
        }
      }, {
        text: 'Send an Audio',
        icon: 'mic',
        cssClass : 'actionSheetIcon',
        handler: () => {
          this.route('/send-an-audio');
        }
      }, {
        text: 'Send a Message',
        icon: 'text',
        cssClass : 'actionSheetIcon',
        handler: () => {
          this.route('/send-a-message');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass : 'actionSheetIcon',
        handler: () => {
          
        }
      }]
    });

    await actionSheet.present();
  }
}
