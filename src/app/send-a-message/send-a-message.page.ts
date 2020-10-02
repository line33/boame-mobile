import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RouterService } from '../services/router.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { Storage } from '@ionic/storage';

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

  constructor(private router : RouterService, private loader : LoaderComponent,
    private network : NetworkService, private alert : AlertComponent, private storage : Storage) { }

  ngOnInit() {
  }

  submit()
  {
    if (this.network.inputValid())
    {
      console.log(30);

      // check images
      if (this.files.images ==  '') return this.alert.show('You need to attach one or more images');

      console.log(31);

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
          const len = this.files.images.length;

          // add images
          for (var x = 0; x < len; x++)
          {
            formData.append('case_images[]', this.files.images[x]);
          }

          // make request
          this.network.post('cases/report/text', formData, false).then((res:any)=>{
            if (res.data.status == 'error')
            {
              this.alert.show(res.data.message, ()=>{
                this.loader.hide();
              });
            }
            else
            {
              this.alert.success(res.data.message, ()=>{
                this.router.route('/report-case');
                this.inputs = {};
                this.files = {images : ''};
                this.resetFileUpload();
                this.loader.hide();
              });
            }
          });
        });
      })
    }
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
    this.listenForFileUpload();
  }

  listenForFileUpload()
  {
    const displayFile : any = document.querySelector('.sendamessage #multipleImages');

    if (displayFile !== null)
    {
      // get the display_image
      const displayImage = document.querySelector('.sendamessage label[for="multipleImages"]');

      let image : any = displayImage.querySelector('.path.image'), number : any = displayImage.querySelector('.path.number');

      // changed
      displayImage.addEventListener('change', ()=>{

        // reset
        number.style.display = 'none';

        // show image
        image.style.display = 'block';

        // are we cool ??
        if (displayFile.files.length > 0)
        {
          number.innerHTML = displayFile.files.length;
          // hide image
          image.style.display = 'none';
          number.style.display = 'block';

          // add now
          this.files.images = displayFile.files;
        }
        
      });

    }
  }

  resetFileUpload()
  {
    // manage display image
    const displayImage = document.querySelector('.sendamessage label[for="multipleImages"]');

    if (displayImage !== null)
    {
      let image : any = displayImage.querySelector('.path.image'), number : any = displayImage.querySelector('.path.number');

      number.style.display = 'none';
      image.style.display = 'block';
    }
  }

}
