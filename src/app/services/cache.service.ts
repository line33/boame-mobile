import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
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
}
