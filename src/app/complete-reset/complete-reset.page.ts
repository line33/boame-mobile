import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { AlertComponent } from '../components/alert/alert.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-complete-reset',
  templateUrl: './complete-reset.page.html',
  styleUrls: ['./complete-reset.page.scss'],
})
export class CompleteResetPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  resetCode : any = '';
  data : any = {};
  canRetry : boolean = false;

  constructor(
    private network : NetworkService, 
    private loader : LoaderComponent, 
    private alert : AlertComponent,
    private router : RouterService) {

    // check username and redirect if not found
    this.data = this.router.getData();
  }

  ngOnInit() {
  }

  submit()
  {
    if (this.network.inputValid('.complete-resetyourpassword'))
    {
      this.loader.show(()=>{
        this.network.post('service/auth/complete-reset-password', {
          username : this.data.username,
          reset_code : this.resetCode
        }).then((res:any)=>{

          if (res.data.status == 'error')
          {
            this.alert.show(res.data.message);

            // hide loader
            this.loader.hide();
          }
          else
          {
            this.alert.success(res.data.message, ()=>{

              // reset
              this.resetCode = '';

              // route
              this.router.route('/home');

              // hide loader
              this.loader.hide();
            });
          }

        });

      });
    }
  }

  resend()
  {
    // can we continue??
    if (!this.canRetry) return this.alert.show('Your timer has to hit zero before you can retry requesting for a code again.');

    // reset timer
    this.canRetry = false;

    // make request
    this.loader.show(()=>{

      this.network.get('service/auth/reset-password/'+this.data.id).then((res:any)=>{
        if (res.data.status == 'error')
        {
          this.alert.show(res.data.message);
        }
        else
        {
          this.alert.success(res.data.message);
        }

        // hide loader
        this.loader.hide(()=>{
          this.createTimer();
        });

      });
    });
  }

  // create timer 
  createTimer()
  {
    if (this.canRetry === false)
    {
      // get element 
      const timer : any = document.querySelector('.timer');

      // start, and end 
      let start = 60;

      // use time interval
      const interval = setInterval(()=>{

        if (start == 0)
        {
          this.canRetry = true;
          timer.innerHTML = '';
          clearInterval(interval);
        }
        else
        {
          timer.innerHTML = '(' + (start--) + ')';
        }

      }, 1000);
    }
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();

    // create timer
    this.createTimer();

    setTimeout(()=>{
      this.data = this.router.dataPassed;
      // we don't have data
      if (this.data === null) this.router.route('/reset-password');
    }, 500);
    
  }

}
