import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {

  loaderContainer : any = null;

  constructor() { }

  ngOnInit() {}

  // show loader
  show(callback : any = null)
  {
    // get the loader wrapper
    this.loaderContainer = (this.loaderContainer === null) ? document.querySelector('.loader-wrapper') : this.loaderContainer;

    // show loader
    if (this.loaderContainer !== null) 
    {
      // show container
      this.loaderContainer.style.display = 'flex';

      // add opacity
      setTimeout(()=>{

        // show opacity
        this.loaderContainer.style.opacity = 1;

        // load callback
        if (callback !== null) callback.call(this);

      },200);
    }

    // return
    return this; 
  }

  // hide loader
  hide(callback : any = null)
  {
    if (this.loaderContainer !== null) 
    {
      // remove opacity
      this.loaderContainer.style.opacity = 0;

      // hide container
      setTimeout(()=>{ 

        // hide display
        this.loaderContainer.style.display = 'none';

        // load callback 
        if (callback !== null) callback.call(this);

      },600);
    }

    // return 
    return this;
  }

}
