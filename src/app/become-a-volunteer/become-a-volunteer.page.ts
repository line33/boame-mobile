import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { CacheService } from '../services/cache.service';
import { NetworkService } from '../services/network.service';
import { RouterService } from '../services/router.service';
import { AlertComponent } from '../components/alert/alert.component';

@Component({
  selector: 'app-become-a-volunteer',
  templateUrl: './become-a-volunteer.page.html',
  styleUrls: ['./become-a-volunteer.page.scss'],
})
export class BecomeAVolunteerPage implements OnInit {
  
  @ViewChild(IonContent) content: IonContent;

  positions : any = [];
  inputs : any = {
    positionid : ''
  };
  static clearInputs : boolean = false;

  constructor(private cache : CacheService, private network : NetworkService,
    private router : RouterService, private alert : AlertComponent) {

    // load positions
    this.cache.getVolunteerPosition().then((positions : any) => {
      this.positions = positions;
    });
  }

  submit()
  {
    if (this.network.inputValid('.becomeavolunteer'))
    {
      // compare password
      if (this.inputs.password != this.inputs.password_again) return this.alert.show('Password provided does not match');

      // move to the next screen
      this.router.route('/complete-volunteer-reg', this.inputs);
    }
  }

  ionViewWillEnter()
  {
    if (BecomeAVolunteerPage.clearInputs)
    {
      this.inputs = {positionid : ''};
      BecomeAVolunteerPage.clearInputs = false;
    }
  } 

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

}
