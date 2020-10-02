import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-online-counselors',
  templateUrl: './online-counselors.page.html',
  styleUrls: ['./online-counselors.page.scss'],
})
export class OnlineCounselorsPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  constructor(private router : RouterService) { }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

  loginAndRedirect()
  {
    AppComponent.redirectTo = '/chat-list';
    
    // redirect back to the login screen
    this.router.route('/home');
  }
}
