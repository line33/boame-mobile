import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from '../components/go-back/go-back.component';
import { AppComponent } from '../app.component';
import { NetworkService } from '../services/network.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { AlertComponent } from '../components/alert/alert.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  canSave : boolean = false;
  display_image : string = '';
  account : any = {};
  attachment : any = {};

  constructor(public historyComponent : GoBackComponent, private network : NetworkService,
    private loader : LoaderComponent, private alert : AlertComponent) {

    if (AppComponent.accountInformation != null)
    {
      const account = AppComponent.accountInformation;

      // generic_avatar.png
      this.display_image = (account.account.display_image == null) ? 'generic_avatar.png' : account.account.display_image;

      // push account
      this.account = account.account;
    }

  }

  ngOnInit() {
    this.watch();
  }

  goback()
  {
    this.historyComponent.goback();
  }

  watch()
  {
      const image : any = document.querySelector('*[name="display_image"]');
      const displayImage : any = document.querySelector('.display_image');

      image.addEventListener('change', ()=>{
         const file = image.files[0];
         const type = file.type;

         if (type.match(/^(image)/))
         {
            this.canSave = true;
            var filereader = new FileReader();
            filereader.onload = (e:any) => {
               displayImage.src = e.target.result;
               this.attachment = file;
            };
            filereader.readAsDataURL(file);
         }
         else
         {
            this.canSave = false;
         }
      });
  }

  loadImage()
  {
    // render image
    return AppComponent.storageUrl + '/' + this.display_image;
  }

  saveProfile()
  {
    if (this.canSave)
    {
      this.loader.show(()=>{
        this.network.post('service/account/update/'+this.account.accountid, {
          display_image : this.attachment,
          firstname : this.account.firstname,
          lastname : this.account.lastname
        }).then((res:any)=>{
          if (res.data.status == 'error')
          {
            this.alert.show(res.data.message);
            this.loader.hide();
          }
          else
          {
            this.network.get('service/account/'+this.account.accountid).then((data:any) => {
              AppComponent.accountInformation.account = data.data.account;
              this.alert.success(res.data.message);
              this.loader.hide();
              this.canSave = false;
            });
          }
        });
      });
    }
  }

}
