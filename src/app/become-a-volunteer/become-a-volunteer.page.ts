import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { CacheService } from '../services/cache.service';
import { NetworkService } from '../services/network.service';
import { RouterService } from '../services/router.service';
import { AlertComponent } from '../components/alert/alert.component';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-become-a-volunteer',
  templateUrl: './become-a-volunteer.page.html',
  styleUrls: ['./become-a-volunteer.page.scss'],
})
export class BecomeAVolunteerPage implements OnInit {
  
  @ViewChild(IonContent) content: IonContent;

  positions : any = [];
  inputs : any = {
    positionid : '',
    gender : ''
  };
  validation : any = {
    error : {},
    rules : {
      gender : ['2', 'You must select a gender'],
      positionid : ['1', 'You must select a position'],
      phone : ['6', 'Must be a valid telephone number'],
      email : ['5', 'Must be a valid email address'],
      lastname : ['2', 'Should be your last name'],
      firstname : ['2', 'Should be your first name'],
      password : ['4', 'Should be a password you can remember'],
      password_again : ['4', 'Should match your password, and cannot be empty'],
      address : ['5', 'Must be a valid address']
    }
  };
  static clearInputs : boolean = false;

  constructor(private cache : CacheService, private network : NetworkService,
    private router : RouterService, private alert : AlertComponent, private audio : AudioService) {

    // load positions
    this.cache.getVolunteerPosition().then((positions : any) => {
      this.positions = positions;
    });
  }


  submit()
  {
    const validate = this.network.inputValid(this.inputs, this.validation);

    if (validate.ok === true)
    {
      // compare password
      if (this.inputs.password != this.inputs.password_again) return this.alert.show('Password provided does not match');

      // move to the next screen
      this.router.route('/complete-volunteer-reg', this.inputs);
    }
    else
    {
      this.validation.error = validate.error;
      this.audio.presentToast('You have an input error');
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
