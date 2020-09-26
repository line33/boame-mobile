import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(private storage : Storage, private network : NetworkService) { }

  loadAll()
  {
    this.getVolunteerPosition();
  }

  getVolunteerPosition()
  {
    this.network.get('volunteer/positions').then((res:any)=>{
      // are we good ??
      if (res.data.status == 'success')
      {
        this.storage.set('boame_volunteer_positions', res.data.records);
      }
    });
  }
}
