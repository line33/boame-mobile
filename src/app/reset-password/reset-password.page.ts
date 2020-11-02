import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { RouterService } from '../services/router.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  inputs : any = {};
  validation : any = {
    error : {},
    rules : {
      password : [4, 'Your password must not be empty or less than 4 characters'],
      password_again : [4, 'Your password must not be empty or less than 4 characters'],
      username : [4, 'You must provide a valid username'],
    }
  }

  constructor(
    private network : NetworkService, 
    private alert : AlertComponent, 
    private loader : LoaderComponent,
    private router : RouterService,
    private storage : Storage
  ) { }

  ngOnInit() {
    this.storage.get('boame_username').then(username => {
      if (username !== null)
      {
        this.inputs.username = username;
      }
    });
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  submit()
  {
    const validate = this.network.inputValid(this.inputs, this.validation);

    if (validate.ok === true)
    {
      // check password
      if (this.inputs.password == this.inputs.password_again)
      {
        // make request
        this.loader.show(()=>{

          // make request
          this.network.post('service/auth/reset-password', {
            username : this.inputs.username,
            password : this.inputs.password,
            password_again : this.inputs.password_again
          }).then((res:any)=>{

            if (res.data.status == 'error')
            {
              this.alert.show(res.data.message);

              this.loader.hide();
            }
            else
            {
              this.alert.success(res.data.message, ()=>{

                // redirect to complete password reset
                this.router.route('/complete-reset', {
                  username : this.inputs.username,
                  id : res.data.vaultId
                });

                // reset inputs
                this.inputs.password = this.inputs.password_again = '';

                this.loader.hide();
              });
            }

          });
        });
      } 
      else
      {
         this.alert.show('Password provided does not match');
      }
    }
    else
    {
      this.validation.error = validate.error;
    }
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

}
