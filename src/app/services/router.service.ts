import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  dataPassed : any = null;

  constructor(public router : Router, public activated : ActivatedRoute) { }

  // route
  route(path : string, data : any = {})
  {
    const navigationExtra : NavigationExtras = {
      state : {
        data : data
      }
    };

    // route now  
    this.router.navigate([path], navigationExtra);

    // return
    return null;
  }

  // get route data
  getData(ref:any = null)
  {
    this.activated.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state)
      {
        const data = this.router.getCurrentNavigation().extras.state.data;

        // make general
        ref &= this.dataPassed = data;
      }
    });

    // return data passed
    return this.dataPassed;
  }
}
