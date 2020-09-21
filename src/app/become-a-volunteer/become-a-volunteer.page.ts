import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-become-a-volunteer',
  templateUrl: './become-a-volunteer.page.html',
  styleUrls: ['./become-a-volunteer.page.scss'],
})
export class BecomeAVolunteerPage implements OnInit {
  
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
