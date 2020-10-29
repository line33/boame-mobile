import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AppComponent } from '../app.component';
import { CacheService } from '../services/cache.service';
import { ChatService } from '../services/chat.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.page.html',
  styleUrls: ['./chat-list.page.scss'],
})
export class ChatListPage implements OnInit {

  static chatList : any = null;
  hasChatList : boolean = false;
  chats : any = [];
  accountid : any = '';
  plural : string = '';
  static intervalInitialized : boolean = false;

  constructor(private chat : ChatService, private router : RouterService, private cache : CacheService,
    private storage : Storage) { }

  ngOnInit() {
    
  }

  // is authenticated
  ionViewWillEnter()
  {
    this.storage.get('boame_device_hash').then(hash => {
      
      if (AppComponent.accountInformation != null)
      {
        this.accountid = AppComponent.accountInformation.account.accountid;
      }
      else
      {
        this.accountid = hash;
      } 

      // load chat list
      this.cache.getChatList().then((chat_list:any)=>{

        const getResponse = JSON.parse(chat_list);

        ChatListPage.chatList = getResponse;
        this.hasChatList = true;

        // load chats
        this.chats = this.loadList();
        
        // update chat list
        this.loadChatList();

        if (AppComponent.accountInformation != null)
        {
          // chat service requested
          if (AppComponent.accountInformation.account.accounttypeid == 4) this.chat.serviceRequested('chat-with-counselor');
        }
        else
        {
          this.chat.serviceRequested('chat-with-counselor');
        }

      }).catch(()=>{

        this.loadChatList();

      });

    });

  }

  // load chat list
  loadChatList()
  {
    // load chatlist
    this.chat.chatList();
    
    this.chat.getChatList().subscribe((response:any)=>{
      const getResponse = JSON.parse(response);

      // cache response
      this.cache.cacheChatList(response);

      ChatListPage.chatList = getResponse;
      this.hasChatList = true;

      // load chats
      this.chats = this.loadList();

      // initialize interval
      this.fetchNewMessages();

    });
  }

  // load image
  loadImage(image:string)
  {
    return AppComponent.storageUrl + '/' + image;
  }

  // update dom every 5 seconds
  fetchNewMessages()
  {
    if (ChatListPage.intervalInitialized === false)
    {
      setInterval(()=>{
        this.loadChatList();
      }, 10000);

      // interval initialized
      ChatListPage.intervalInitialized = true;
    }
    
  }

  // load lists
  loadList() : any
  {
    let list : any = [];

    // update plural
    this.plural = '';

    if (ChatListPage.chatList !== null)
    {
       list = ChatListPage.chatList.chats;
       this.hasChatList = true;
       const chatList : any = [];

       // loop through
       for (var accountid in list)
       {
          list[accountid].accountid = accountid;
          chatList.push(list[accountid]);
       }

       // reset list
       list = chatList;
    }
    
    // update list
    if (list.length > 1) this.plural = 's';

    // return list
    return list;
  }

  // chat now
  chatNow(chat:any)
  {
    this.router.route('/chat-screen', {
      chat : {
        firstname     : chat.firstname,
        lastname      : chat.lastname,
        accountid     : chat.accountid,
        display_image : chat.display_image
      }
    });

  }

  // new message??
  newMessage(chat:any)
  {
    return (chat.lastreplied == 0) ? 'chat-list' : 'chat-list new-message';
  }
}
