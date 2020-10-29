import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AudioService } from '../services/audio.service';
import { AlertComponent } from '../components/alert/alert.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-send-an-audio',
  templateUrl: './send-an-audio.page.html',
  styleUrls: ['./send-an-audio.page.scss'],
})
export class SendAnAudioPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  formats : string = '';

  constructor(private audio : AudioService, private alert : AlertComponent,
    private router : RouterService) {
    this.formats = this.audio.formats;
  }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){

    this.scrollToTop();

    // process audio
    this.processAudio(); 
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

  processAudio()
  {
    this.audio.getAudio('.sendanaudio #audio_file').then((file:any)=>{
      if (file.type == 'video/mp4') return this.alert.show('Invalid Audio file. Please close this modal and try again.');

      // make submission now
      this.router.route('/submit-audio', {
        type : 'upload',
        file : file
      });

      // load method
      this.processAudio();

    });
  }

}
