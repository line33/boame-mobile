import { Component, OnInit } from '@angular/core';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { Storage } from '@ionic/storage';
import { Socket } from 'ngx-socket-io';
import { CacheService } from '../services/cache.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  static recordedUsuage : boolean = false;

  constructor(private socket : Socket, private cacheService : CacheService,
    private uniqueDeviceID: UniqueDeviceID, private storage : Storage,
    private chatService : ChatService) {
    // record usage
    if (WelcomePage.recordedUsuage === false)
    {
      this.socket.emit('app in use');
      WelcomePage.recordedUsuage = true;
    }

    // load to local storage 
    this.cacheService.loadAll();

    // generate device hash for the first time if not generated
    this.storage.get('boame_device_hash').then((hash:any)=>{

      console.log(hash);
      
      if (hash == null)
      {
        // generate one
        //const hash = 
        this.uniqueDeviceID.get()
        .then((uuid: any) => {
          this.storage.set('boame_device_hash', uuid);
          // now online
          this.chatService.nowOnline();
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

          // now online
          this.chatService.nowOnline();
        });
      }
      else
      {
        // now online
        this.chatService.nowOnline();
      }
    });
  }

  ngOnInit() {
  }

}
