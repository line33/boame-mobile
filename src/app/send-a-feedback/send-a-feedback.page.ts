import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { Storage } from '@ionic/storage';
import { RouterService } from '../services/router.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-send-a-feedback',
  templateUrl: './send-a-feedback.page.html',
  styleUrls: ['./send-a-feedback.page.scss'],
})
export class SendAFeedbackPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  inputs : any = {};
  validation : any = {
    error : {},
    rules : {
      fullname : [4, 'Your fullname please. This cannot be empty.'],
      email : [5, 'We would like to leave you a message.'],
      message : [10, 'A minimum of 10 characters only.']
    }
  };

  constructor(private network : NetworkService, private alert : AlertComponent, private loader : LoaderComponent,
    private storage : Storage, private router : RouterService, private toast : ToastController) { }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    // auto fill fullname if loggedin
    if (AppComponent.accountInformation != null)
    {
      const account = AppComponent.accountInformation.account;
      this.inputs.fullname = account.lastname + ' ' + account.firstname;
      this.inputs.email = account.email;
    }
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  submit()
  {

    const validate = this.network.inputValid(this.inputs, this.validation);

    if (validate.ok === true)
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
    else
    {
      this.validation.error = validate.error;
      this.presentToast('All fields are required!');
    }
  }

  async presentToast(msg : string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      animated : true
    });
    toast.present();
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }
}
