import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
import { ChatService } from '../services/chat.service';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  data : any = {};

  constructor(public chatService : ChatService,
    private localNotification : LocalNotifications,
    private router: RouterService, private route : Router,
    private alert : AlertController,
    private storage : Storage) {

  }

  prepareNotification()
  {
    // configure local notification
    this.localNotification.setDefaults({
      led : {color : '#FF00FF', on : 500, off : 500},
      vibrate : false
    });

    // check permission
    this.localNotification.hasPermission().then(granted =>{
      // has permission
      if (granted) this.listenForMessages();
    }, () => {
      // request
      this.localNotification.requestPermission().then(granted =>{
        if (granted) this.listenForMessages();
      });
    });

    // listen for click event
    this.localNotification.on('click').subscribe((res:any)=>{
        let msg = res.data ? res.data.mydata : null;

        // continue
        if (msg !== null)
        {
           // set chatid
           AppComponent.currentChatId = msg.from;

           // request for chat
           this.chatService.autoStartChat(msg.from);
        }
    });


    // start now
    this.chatService.getAutoStartChat().subscribe((res:any)=>{

      // read json
      res = JSON.parse(res);

      if (res.chat.accountid == AppComponent.currentChatId)
      {
        // navigate
        // this.router.navigateByData({url:['/chat'], data : [res.chat]});   
      }

      this.router.route('/chat-screen', {
        chat : {
          firstname     : res.chat.firstname,
          lastname      : res.chat.lastname,
          accountid     : res.chat.accountid,
          display_image : res.chat.display_image
        }
      });

    });

    //AppComponent.chatPl = this.chatService;
  }

  async listenForMessages()
  {
      // listen for incoming messages
      this.chatService.receiveChat().subscribe((res:any) => {

        // show notification
        const data = JSON.parse(res);

        // add type
        data.data.type = 'incoming';

        // notification
        const notification = {
          id          : data.data.id,
          title       : data.data.lastname + ' ' + data.data.firstname,
          text        : data.data.message,
          data        : {mydata : data},
          trigger     : {in : 5, unit : ELocalNotificationTriggerUnit.SECOND},
          foreground  : true,
        };

        this.storage.get('boame_device_hash').then(hash => {

          // @var bool can continue
          let canContinue = false;

          if (hash == null || AppComponent.accountInformation != null)
          {
            if (data.to == AppComponent.accountInformation.account.accountid) canContinue = true;
          }
          else
          {
            if (hash !== null && (data.to == hash)) canContinue = true;
          }

          if (canContinue)
          {
            if (this.route.url != '/chat-screen')
            {
              // notify
              this.localNotification.schedule(notification);
            }
            else
            {
              // from the current person i'm chatting with?
              if (AppComponent.currentChatId != data.from)
              {
                // show notification
                this.localNotification.schedule(notification);
              }
            }
          }

        });
       
      });

      // trigger alert
      const alert = await this.listenForCasesAssigned();


      // listen for cases assigned
      this.chatService.getCaseAssigned().subscribe((res:any) => {

        if (AppComponent.accountInformation !== null)
        {
          if (res.accountid == AppComponent.accountInformation.account.accountid)
          {
            // notify
            this.localNotification.schedule({
              id : res.accountid,
              title : 'New Case',
              text : 'A new case has been assigned to you',
              data : {mydata : res},
              trigger     : {in : 1, unit : ELocalNotificationTriggerUnit.SECOND},
              foreground  : true,
            });

            // set data
            this.data = res;

            // trigger alert
            alert.present();
            
          }
        }

      });

  }

  listenForCasesAssigned()
  {
    return this.alert.create({
      header : 'Notification',
      subHeader : 'A new case has been assigned to you.',
      buttons : [
        {
          text : 'View',
          handler : () => {
            this.router.route('/cases-assigned');
          },
          role : 'Ok'
        },

        {
          text : 'Ignore',
          handler : () => {

          },
          role : 'Cancel'
        }
      ]
    });
  }
}
