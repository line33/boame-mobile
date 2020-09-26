import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  static fetchNew : boolean = true;

  constructor(private storage : Storage, private network : NetworkService) { }

  loadAll()
  {
    this.getVolunteerPosition();

    // do not fetch again
    CacheService.fetchNew = false;
  }

  // get all volunteers positions
  getVolunteerPosition()
  {
    const promise : any = new Promise((resolver)=>{

      // fetch from server
      const fetch : any = function(){

        this.network.get('volunteer/positions').then((res:any)=>{
          // are we good ??
          if (res.data.status == 'success')
          {
            this.storage.set('boame_volunteer_positions', res.data.records);

            // call resolver
            resolver(res.data.records);
          }
        });
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
}
