import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AudioService } from '../services/audio.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-send-an-audio',
  templateUrl: './send-an-audio.page.html',
  styleUrls: ['./send-an-audio.page.scss'],
})
export class SendAnAudioPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  formats : string = '';

  constructor(private audio : AudioService,
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

  captureAudio()
  {
    this.audio.captureAudio((audio:any)=>{
      this.router.route('/submit-audio', {
        type : 'recorded',
        file : audio
      });
    });
  }

  getAudio()
  {
    this.audio.getAudio((audio:any) => {
      this.router.route('/submit-audio', {
        type : 'upload',
        file : audio
      });
    });
  }

}
