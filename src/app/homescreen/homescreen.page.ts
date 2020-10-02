import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.page.html',
  styleUrls: ['./homescreen.page.scss'],
})
export class HomescreenPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  reportCase        : boolean = true;
  becomeAVolunteer  : boolean = true;
  volunteers        : boolean = true;
  knowledgeCenter   : boolean = true;
  counselling       : boolean = true;
  static allowNavigation : any = [];

  constructor(private router : RouterService) {
    this.canShow();
  }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewWillEnter()
  {
    this.canShow();
  }

  canShow()
  {
    // check account information
    const information = AppComponent.accountInformation;

    if (information !== null)
    {
      // reset all
      this.reportCase       = false;
      this.becomeAVolunteer = false;
      this.volunteers       = false;
      this.knowledgeCenter  = false;
      this.counselling      = false;

      // enable some
      HomescreenPage.allowNavigation.forEach((tag:string)=>{

        switch(tag)
        {
          case 'report-case-tag':
            this.reportCase = true;
          break;

          case 'volunteers-tag':
            this.volunteers = true;
          break;

          case 'become-volunteer-tag':
            this.becomeAVolunteer = true;
          break;

          case 'knowledge-tag':
            this.knowledgeCenter = true;
          break;

          case 'counselling-tag':
            this.counselling = true;
          break;
        }

      });
    }
  }

  chat()
  {
    // is this person logged in??
    if (AppComponent.accountInformation == null) return this.router.route('/online-counselors');

    // go to chat list
    this.router.route('/chat-list');
  }
}
