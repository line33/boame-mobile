import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { VideoService } from '../services/video.service';
import { AlertComponent } from '../components/alert/alert.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-send-a-video',
  templateUrl: './send-a-video.page.html',
  styleUrls: ['./send-a-video.page.scss'],
})
export class SendAVideoPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  formats : string = '';

  constructor(private video : VideoService, private alert : AlertComponent,
    private router : RouterService) {
    this.formats = this.video.formats;
  }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();

    // process video
    this.processVideo();
  }

  recordVideo()
  {
    this.video.captureVideo((video:any)=>{
      this.router.route('/submit-video', {type:'recorded', file : video});
    });
  }

  processVideo()
  {
    this.video.getVideo('.sendavideo #video_file').then((file:any)=>{
      if (file.type == 'audio/mp4') return this.alert.show('Invalid Video file. Please close this modal and try again.');

      // make submission now
      this.router.route('/submit-video', {
        type : 'upload',
        file : file
      });

      // load method
      this.processVideo();

    });
  }

}
