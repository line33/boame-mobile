import { Component, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { NetworkService } from '../services/network.service';
import { RouterService } from '../services/router.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { AlertComponent } from '../components/alert/alert.component';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-submit-video',
  templateUrl: './submit-video.page.html',
  styleUrls: ['./submit-video.page.scss'],
})
export class SubmitVideoPage implements OnInit {

  videoRecord : boolean = false;
  formats : string = '';
  file : any = null;
  reportText : string = '';

  constructor(private video : VideoService, private network : NetworkService,
    private router : RouterService, private loader : LoaderComponent,
    private alert : AlertComponent, private chatService : ChatService) {
    this.formats = this.video.formats;
  }

  ngOnInit() {
    this.router.getData((data:any)=>{

      // can we continue
      if (data == null) return this.router.route('/send-a-video');

      // get the type
      switch (data.type)
      {
        case 'upload':
          this.videoRecord = false;
        break;

        case 'recorded':
          this.videoRecord = true;
        break;
      }
      
      // load file
      this.file = data.file;

    });
  }

  ionViewDidEnter()
  {
    // process video
    this.processVideo();
  }

  recordVideo()
  {
    this.video.captureVideo((video:any) => {
      // changed
      this.alert.success('Video file changed, please close this modal to continue.');

      // update file
      this.file = video;
    });
  }

  processVideo()
  {
    this.video.getVideo('.submituploadedvideo #video_file2').then((file:any)=>{
      if (file.type == 'audio/mp4') return this.alert.show('Invalid Video file. Please close this modal and try again.');

      // changed
      this.alert.success('Video file changed, please close this modal to continue.');

      // update file
      this.file = file;

      // listen again
      this.processVideo();
    });
  }

  submit()
  {
    // please select a video
    if (this.file == null && this.videoRecord == false) return this.alert.show('Please select a video to continue');

    // please record a video
    if (this.file == null && this.videoRecord == true) return this.alert.show('Please record a video to continue');

    // show loader
    this.loader.show(()=>{
      this.network.withAccount({
        report          : this.reportText,
        video           : this.file,
        REQUEST_METHOD  : 'PUT' 
      }, (data:any)=>{

        // process callback function
        const processor = (res:any)=>{

          if (res.data.status == 'error')
          {
            this.alert.show(res.data.message);
            this.loader.hide();
          }
          else
          {
            this.chatService.caseSubmitted('video');
            this.alert.success(res.data.message, ()=>{

              // report case service requested
              this.chatService.serviceRequested('report-case-tag-video');

              // delete video locally
              if (this.videoRecord) this.video.deleteVideo(this.file);

              // route out
              this.router.route('/send-a-video');
              this.file = null;
              this.reportText = '';
              this.loader.hide();
            });
          }

        };

        if (this.videoRecord == false) return this.network.post('cases/report/video', data).then(processor);

        // create form data
        const formData = new FormData();

        // delete video
        delete data['video'];

        // add others
        for (var key in data) formData.append(key, data[key]);

        // add video
        formData.append('video', this.file.blob, this.file.name);

        // run post
        this.network.post('cases/report/video', formData, false).then(processor);

      });
    });
  }

}
