import { Component, OnInit, ViewChild } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-report-case',
  templateUrl: './report-case.page.html',
  styleUrls: ['./report-case.page.scss'],
})
export class ReportCasePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  constructor(private call : CallNumber) { }

  ngOnInit() {
  }

  phoneCall()
  {
    this.call.callNumber('+233551000900', false)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

}
