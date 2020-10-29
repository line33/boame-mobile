import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { AlertComponent } from '../components/alert/alert.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  inputs : any = {
    gender : ''
  };

  constructor(private network : NetworkService,
    private loader : LoaderComponent,
    private alert : AlertComponent,
    private router : RouterService) { }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  register()
  {
    if (this.network.inputValid('.createanaccount'))
    {
      // compare password
      if (this.inputs.password == this.inputs.password_again)
      {
        this.loader.show(()=>{
          this.network.post('service/auth/register/reporter', {
            firstname       : this.inputs.firstname,
            lastname        : this.inputs.lastname,
            email           : this.inputs.email,
            telephone       : this.inputs.phone,
            password        : this.inputs.password,
            password_again  : this.inputs.password_again,
            gender          : this.inputs.gender,
          }).then((res:any)=>{

            // do we have a response
            if (res.data.status == 'error')
            {
              this.alert.show(res.data.message);

              // hide loader
              this.loader.hide();
            }
            else
            {
              //route now
              this.alert.success(res.data.message, ()=>{

                // redirect
                this.router.route('/home');

                // clear all
                this.inputs = {};

                // hide loader
                this.loader.hide();
              });
            }

          });
        });
      }
      else
      {
        this.alert.show('Password provided does not match. Please check and try again.', ()=>{
          this.inputs.password = this.inputs.password_again = '';
        });
      }
    }
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }
}
