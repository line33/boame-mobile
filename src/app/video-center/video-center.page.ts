import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.page.html',
  styleUrls: ['./video-center.page.scss'],
})
export class VideoCenterPage implements OnInit {

  static isPreviewed : boolean = false;

  @ViewChild(IonContent) content: IonContent;

  constructor() {
    VideoCenterPage.isPreviewed = false;
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ngOnInit() {
    
  }

  ionViewDidEnter()
  {
    if (VideoCenterPage.isPreviewed === false) this.scrollToTop();

    // update now
    VideoCenterPage.isPreviewed = true;
    
  }

}
