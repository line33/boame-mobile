import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {

  alertContainer : any = null;
  alertShowing : boolean = false;
  successAlert : boolean = false;

  constructor() { }

  ngOnInit() {}

  // show alert
  show(message : string, callback : any = null)
  {
    // add container
    this.alertContainer = (this.alertContainer === null) ? document.querySelector('.alert-container') : this.alertContainer;

    // can we show ?
    if (this.alertContainer !== null && this.alertShowing === false)
    {
      // get the alert box
      const alertBox = this.alertContainer.querySelector('.alert-box > p');

      // replace content
      if (alertBox !== null) alertBox.innerHTML = message;

      // success alert??
      if (this.successAlert)
      {
        this.alertContainer.classList.add('alert-success');
        this.successAlert = false;
      }

      // show now
      this.alertContainer.style.display = 'block';

      //  make visible
      setTimeout(()=>{
        this.alertContainer.style.opacity = 1;
      },100);

      // now showing
      this.alertShowing = true;

      // look for the alert-close-btn
      const alertCloseBtn = this.alertContainer.querySelector('.alert-close-btn');

      // are we good ??
      if (alertCloseBtn !== null)
      {
        alertCloseBtn.addEventListener('click', ()=>{
          this.alertContainer.style.transform = 'translateY(-120vh)';
          // not showing
          this.alertShowing = false;

          setTimeout(()=>{
            this.alertContainer.removeAttribute('style');
            this.alertContainer.className = 'alert-container';
            // load callback
            if (callback !== null && (typeof callback == 'function')) callback.call(this);
          }, 700);
        });
      }

    }

    return null;
  }

  // success alert
  success(message : string, callback : any = null)
  {
    this.successAlert = true;
    return this.show(message, callback);
  }

}
