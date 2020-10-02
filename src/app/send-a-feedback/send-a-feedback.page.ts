import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { Storage } from '@ionic/storage';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-send-a-feedback',
  templateUrl: './send-a-feedback.page.html',
  styleUrls: ['./send-a-feedback.page.scss'],
})
export class SendAFeedbackPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  inputs : any = {};

  constructor(private network : NetworkService, private alert : AlertComponent, private loader : LoaderComponent,
    private storage : Storage, private router : RouterService) { }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  submit()
  {
    if (this.network.inputValid('.sendafeedback'))
    {
      this.loader.show(()=>{
        // get the device hash
        this.storage.get('boame_device_hash').then((hash)=>{

          // make request
          this.network.post('service/feedback', {
            devicehash  : hash,
            fullname    : this.inputs.fullname,
            email       : this.inputs.email,
            feedback    : this.inputs.message
          }).then((res:any)=>{

            if (res.data.status == 'error')
            {
              this.alert.show(res.data.message, ()=>{
                this.loader.hide();
              });
            }
            else
            {
              this.alert.success(res.data.message, ()=>{
                this.router.route('/homescreen');
                this.inputs = {};
                this.loader.hide();
              });
            }
          });

        });
      });
    }
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }
}
