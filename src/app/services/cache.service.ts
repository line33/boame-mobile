import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';
import { AppComponent } from '../app.component';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  static fetchNew : boolean = true;

  constructor(private storage : Storage, public network : NetworkService) { }

  loadAll()
  {
    this.getVolunteerPosition();
    this.getConfiguration();

    // do not fetch again
    CacheService.fetchNew = false;
  }

  // get all volunteers positions
  getVolunteerPosition()
  {
    const promise : any = new Promise((resolver)=>{

      // fetch from server
      const fetch : any = ()=>{

        if (typeof this.network != 'undefined')
        {
          this.network.get('volunteer/positions').then((res:any)=>{
            // are we good ??
            if (res.data.status == 'success')
            {
              this.storage.set('boame_volunteer_positions', res.data.records);

              // call resolver
              resolver(res.data.records);
            }
          });
        }
      };

      this.storage.get('boame_volunteer_positions').then((positions:any)=>{

        // run fecth
        if (positions === null) return fetch();

        // load from cache
        resolver(positions);

        // try reloading
        if (CacheService.fetchNew) fetch();

      });

    });

    // return promise
    return promise;
    
  }

  // get configuration
  getConfiguration()
  {
    const promise : any = new Promise((resolver)=>{

      // fetch from server
      const fetch : any = ()=>{

        if (typeof this.network != 'undefined')
        {
          this.network.get('service/config').then((res:any)=>{
            
            // are we good ??
            if (res.data.status == 'success')
            {
              this.storage.set('boame_app_config', res.data.config);

              // call resolver
              resolver(res.data.config);

              // add 
              AppComponent.storageUrl = res.data.config.storage_url;
            }
          });
        }
      };

      this.storage.get('boame_app_config').then((config:any)=>{

        // run fecth
        if (config === null) return fetch();

        // load from cache
        resolver(config);

        // add
        AppComponent.storageUrl = config.storage_url;

        // try reloading
        if (CacheService.fetchNew) fetch();

      });

    });

    // return promise
    return promise;
    
  }

  // get chat list
  getChatList()
  {
    const promise = new Promise((resolver, reject)=>{
      this.storage.get('boame_user_chat_list').then((chat_list:any)=>{
        if (chat_list == null) return reject('no chat list cache');
        // return cache
        resolver(chat_list);
      });
    });

    return promise;
  }

  // load getCounsellors
  getCounsellors()
  {
    return new Promise((resolve, reject)=>{
      this.storage.get('boame_counsellors_list').then((counsellors:any)=>{
        if (counsellors !== null) return resolve(counsellors);
        reject('no counselor');
      }).catch(()=>{
        reject('no counselor');
      })
    });
  }

  // cache counsellors
  cacheCounsellors(counsellors:any)
  {
    this.storage.set('boame_counsellors_list', counsellors);
  }

  // cache response
  cacheChatList(response:any)
  {
    this.storage.set('boame_user_chat_list', response);
  }

  // cache chat
  cacheChat(receiver:number = 0, chat:any = [])
  {
    // get cache
    this.storage.get('boame_user_chat_history').then((history:any)=>{

      this.storage.get('boame_device_hash').then(hash => {

        // save now
        const key = "chat"+receiver+'_'+hash;

        // do we have something
        if (history == null)
        {
          // add to list
          const chatList = {key : chat};

          // save now
          this.storage.set('boame_user_chat_history', chatList);
        }
        else
        {
          history[key] = chat;
          
          // save now
          this.storage.set('boame_user_chat_history', history);
        }

      });

    });
  }

  // get chat cache
  getChatCache(receiver:number = 0)
  {
    return new Promise((resolver, reject)=>{

      // get cache
      this.storage.get('boame_user_chat_history').then((history:any)=>{

        if (history == null) return reject();

        // get accountid
        this.storage.get('boame_device_hash').then(hash => {

          // find key
          const key = "chat"+receiver+'_'+hash;

          // do we have an entry
          if (typeof history[key] != 'undefined') return resolver(history[key]);

          // not foumd
          reject();

        });

      });

    });
    
  }
}
