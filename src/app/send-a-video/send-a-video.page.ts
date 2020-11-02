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

  constructor(private video : VideoService, private alert : AlertComponent,
    private router : RouterService) {

  }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

  recordVideo()
  {
    this.video.captureVideo((video:any)=>{
      this.router.route('/submit-video', {type:'recorded', file : video});
    });
  }

  pickVideo()
  {
    this.video.getVideo((video:any) => {
      this.router.route('/submit-video', {type:'upload', file : video});
    });
  }

}
