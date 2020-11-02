import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from '../components/go-back/go-back.component';
import { AppComponent } from '../app.component';
import { NetworkService } from '../services/network.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { AlertComponent } from '../components/alert/alert.component';
import { File } from '@ionic-native/File/ngx';
import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ToastController } from '@ionic/angular';
import { RouterService } from '../services/router.service';

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
  image : string = '';

  constructor(public historyComponent : GoBackComponent, private network : NetworkService,
    private loader : LoaderComponent, private alert : AlertComponent,
    private chooser : Chooser, private filePath : FilePath, private file : File,
    private toast : ToastController, private router : RouterService) {

    if (AppComponent.accountInformation != null)
    {
      const account = AppComponent.accountInformation;

      // generic_avatar.png
      this.display_image = (account.account.display_image == null) ? 'generic_avatar.png' : account.account.display_image;

      // push account
      this.account = account.account;

      // load image
      this.image = this.loadImage();
    }
    else
    {
      this.router.route('/homescreen');
    }

  }

  getImage()
  {
    this.canSave = false;

    // load chooser
    this.chooser.getFile("image/*").then((value : ChooserResult) => {
      
      if (value.mediaType.indexOf('image/') >= 0)
      {
        const fileType = value.mediaType;
        
        this.filePath.resolveNativePath(value.uri).then(async (path:any) => {
          
          // get the directory
          const directory = path.substr(0, (path.lastIndexOf('/') + 1));

          // get buffer
          const buffer = await this.file.readAsArrayBuffer(directory, value.name);

          // get the file blob
          const fileBlob = new Blob([buffer], {type : fileType});

          // ok we good
          this.image = value.dataURI;
          this.attachment = {
              blob : fileBlob,
              name : value.name,
              extension : value.name.split('.').pop()
          };

          // show toast
          this.presentToast();

          // can show
          this.canSave = true;

        });

      }
      
    }, err => {
      console.log(err);
      this.canSave = false;
    });
  }

  ngOnInit() {
    
  }

  goback()
  {
    this.historyComponent.goback();
  }

  async presentToast(msg : string = 'An image has been selected.') {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      animated : true
    });
    toast.present();
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

        // build formdata
        const formdata = new FormData();
        formdata.append('firstname', this.account.firstname);
        formdata.append('lastname', this.account.lastname);
        formdata.append('display_image', this.attachment.blob, this.attachment.name);

        // push
        this.network.post('service/account/update/'+this.account.accountid, formdata, false).then((res:any)=>{
          if (res.data.status == 'error')
          {
            this.loader.hide(()=>{
              this.presentToast(res.data.message);
            });
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
