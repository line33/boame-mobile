import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
import { AlertComponent } from '../components/alert/alert.component';
import { GoBackComponent } from '../components/go-back/go-back.component';
import { AudioService } from '../services/audio.service';
import { CacheService } from '../services/cache.service';
import { ChatService } from '../services/chat.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.page.html',
  styleUrls: ['./chat-screen.page.scss'],
})
export class ChatScreenPage implements OnInit {

  @ViewChild(IonContent) content : IonContent;

  activity : string = '';
  fullname : string = '';
  image : string = '';
  chats : any = [];
  message : string = '';
  chat : any = {};
  domLoaded : string = 'hidden';
  typing : any = null;

  constructor(private back : GoBackComponent, private audio : AudioService, private alert : AlertComponent,
    private chatService : ChatService, public _zone: NgZone,
    private router : RouterService, private cache : CacheService,
    private storage : Storage) {

      // get chat
    this.router.getData((data:any) => {

      this.chat = data.chat;

      // set the full name
      const fullname = data.chat.firstname + ' ' + data.chat.lastname;

      // set now
      this.fullname = fullname.substr(0, 15);

      // set the display image
      this.image = AppComponent.storageUrl + '/' + data.chat.display_image;

      // load conversation
      this.loadConversation();

      // active chat
      AppComponent.currentChatId = this.chat.accountid;

    });

  }

  ngOnInit() {

    this.storage.get('boame_device_hash').then((hash)=>{

      // get the accountid
      let accountid = hash;

      // now check if loggedin
      if (AppComponent.accountInformation !== null) accountid = AppComponent.accountInformation.account.accountid;

      // user typing
      this.chatService.getWhenTyping().subscribe((res:any)=>{
          res = JSON.parse(res);
          // check accountid 
          if (res.accountid == this.chat.accountid && res.receiver == accountid)
          {
              this.activity = 'typing..';
          }
      });

      // not typing
      this.chatService.getWhenNotTyping().subscribe((res:any)=>{
        res = JSON.parse(res);
        // check accountid 
        if (res.accountid == this.chat.accountid && res.receiver == accountid)
        {
            this.activity = '';
        }
      });

      // listen for incoming messages
      this.chatService.receiveChat().subscribe((res:any) => {

        // decode
        const data = JSON.parse(res);

        if (data.from == this.chat.accountid)
        {
          if (data.to == accountid)
          {
              // add type
              data.data.type = 'incoming';

              this.chats.push(data.data);

              this.scrollToBottom();

              // cache chat
              this.cache.cacheChat(this.chat.accountid, this.chats);
          }
        }

      });

    });
  }

  recordAudio()
  {
    this.alert.show('Coming soon. Not included in this release.');
  }

  makeCall()
  {
    this.alert.show('Coming soon. Not included in this release.');
  }

  ionInput()
  {
    // user typing
    this.chatService.nowTyping(this.chat.accountid);

     // clear timeout
     clearTimeout(this.typing);

     this.typing = setTimeout(()=>{
        // not typing
        this.chatService.stoppedTyping(this.chat.accountid);
     }, 500);

  }

  goback()
  {
    this.back.goback();
  }

  sendMessage()
  {
     this.chatService.sendChat(this.message, this.chat.accountid);

     // append
     this.chats.push({
       message : this.message,
       type : 'outgoing',
       date : (new Date().toDateString())
     });

     this.scrollToBottom();

     // cache chat
     this.cache.cacheChat(this.chat.accountid, this.chats);

     this.message = '';
    
  }

  scrollToBottom(duration:number = 300, delay:number = 20)
  {
    this._zone.run(() => {

      setTimeout(() => {

        if (typeof this.content !== null)
        {
          this.content.scrollToBottom(duration).then(()=>{
            setTimeout(()=>{
              this.content.getScrollElement().then((element:any)=>{
                if (element.scrollTopMax != element.scrollTop)
                {
                  this.content.scrollToBottom(duration).then(()=>{
                    this.makeContentVisible();
                  });
                }
                else
                {
                  this.makeContentVisible();
                }
              });
            });
          }, ()=>{
          });
        }

      }, delay);
    }); 
  }

  ionViewWillEnter()
  {
    this.domLoaded = 'hidden';
  }

  makeContentVisible()
  {
    if (this.domLoaded == 'hidden')
    {
      setTimeout(()=>{
        this.domLoaded = 'show';
      },0);
    }
  }

  loadConversation()
  {
    this.cache.getChatCache(this.chat.accountid).then((history:any)=>{
      this.chats = history;
      this.scrollToBottom(0,0);

      // fetch new chats
      this.fetchConversations();

    }).catch(()=>{
      this.fetchConversations();
    });
  }

  fetchConversations()
  {
    this.chatService.chatConversations(this.chat.accountid);

    // ready ?
    this.chatService.getConversations().subscribe((res:any) => {
      const data = JSON.parse(res);
      let conversations : any = [];

      // start with outgoing
      data.conversations.outgoing.forEach((element:any) => {
          element.type = 'outgoing';
          conversations[element.id] = element;
      });

      // start with incoming
      data.conversations.incoming.forEach((element:any) => {
        element.type = 'incoming';
        conversations[element.id] = element;
      });

      var filtered = conversations.filter(function (el:any) {
        return el != null;
      });

      // push
      this.chats = filtered;

      // scroll to bottom
      this.scrollToBottom();

      // cache chat
      this.cache.cacheChat(this.chat.accountid, this.chats);

    });
  }

}
