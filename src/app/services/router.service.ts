import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AppComponent } from '../app.component';

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
}
