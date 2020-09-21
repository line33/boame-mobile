import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-complete-volunteer-reg',
  templateUrl: './complete-volunteer-reg.page.html',
  styleUrls: ['./complete-volunteer-reg.page.scss'],
})
export class CompleteVolunteerRegPage implements OnInit {

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
