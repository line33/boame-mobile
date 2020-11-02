import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ToastController } from '@ionic/angular';
import { RouterService } from '../services/router.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { ChatService } from '../services/chat.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/File/ngx';

@Component({
  selector: 'app-send-a-message',
  templateUrl: './send-a-message.page.html',
  styleUrls: ['./send-a-message.page.scss'],
})
export class SendAMessagePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  files : any = {
    images : ''
  }
  inputs : any = {};
  images : any = [];

  constructor(private router : RouterService, private loader : LoaderComponent,
    private network : NetworkService, private alert : AlertComponent, private chatService : ChatService,
    private imagePicker : ImagePicker, private toast : ToastController,
    private file : File) { }

  ngOnInit() {
  }

  submit()
  {
    if (this.network.inputValid())
    {
      // check images
      if (this.images.length == 0) return this.alert.show('You need to attach one or more images');

      // start loader
      this.loader.show(()=>{
        this.network.withAccount({
          REQUEST_METHOD : 'PUT',
          report : this.inputs.report
        }, (data:any)=>{

          // generate form data
          const formData = new FormData();
          
          // append data
          for (var key in data)
          {
            formData.append(key, data[key]);
          }

          // add images
          const len = this.images.length;

          // add images
          for (var x = 0; x < len; x++)
          {
            formData.append('case_images[]', this.images[x].blob, this.images[x].name);
          }

          // make request
          this.network.post('cases/report/text', formData, false).then((res:any)=>{
            if (res.data.status == 'error')
            {
              this.loader.hide(()=>{
                this.presentToast(res.data.message);
              });
            }
            else
            {
              this.chatService.caseSubmitted('text');

              this.alert.success(res.data.message, ()=>{
                
                // report case service requested
                this.chatService.serviceRequested('report-case-tag');

                // route
                this.router.route('/homescreen');
                this.inputs = {};
                this.images = [];
                this.loader.hide();
              });
            }
          });
        });
      })
    }
  }

  loadImages()
  {
    this.loader.show();
    this.imagePicker.getPictures({
      maximumImagesCount: 15,
      width: 500,
      height: 500,
      quality: 75
    }).then((pictures:string) => {

      // reset images
      this.images = [];

      // pictures array
      const picturesArray = pictures.toString().split(/[,]/g);

      // get count
      const pictureCount = picturesArray.length;

      // preset toast
      this.presentToast(pictureCount + ' image'+(pictureCount > 1 ? 's' : '')+' selected successfully');

      // hide loader
      this.loader.hide();

      // look through
      picturesArray.forEach(async (pic:string) => {

        // get the directory
        const directory = pic.substr(0, (pic.lastIndexOf('/') + 1));

        // get file name
        const fileName = pic.substr((pic.lastIndexOf('/') + 1));

        // get buffer
        const buffer = await this.file.readAsArrayBuffer(directory, fileName);

        // get mime
        const mime = this.getMimeType(fileName);

        // get the file blob
        const fileBlob = new Blob([buffer], mime);
      
        // push to array
        this.images.push({
          name : fileName,
          blob : fileBlob,
          type : mime
        });

      });

    }, err => console.log('uh oh'));
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  async presentToast(msg : string = 'Images stacked for upload.') {
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

  getMimeType(fileExt:string) {
    if (fileExt == 'png') return { type: 'image/png' };
    else if (fileExt == 'jpg') return { type: 'image/jpg' };
    else if (fileExt == 'jpeg') return { type: 'image/jpeg' };
    else if (fileExt == 'gif') return { type: 'image/gif' };
  }

}
