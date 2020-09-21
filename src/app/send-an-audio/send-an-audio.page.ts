import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-send-an-audio',
  templateUrl: './send-an-audio.page.html',
  styleUrls: ['./send-an-audio.page.scss'],
})
export class SendAnAudioPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  constructor() { }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

}
