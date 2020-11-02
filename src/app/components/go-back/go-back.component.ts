import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { RouterService } from 'src/app/services/router.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
})
export class GoBackComponent implements OnInit {

  constructor(private location : Location, private navCtrl : NavController,
    private router : RouterService, private mainRouter : Router) { }

  ngOnInit() {}

  goback()
  {
    // Provide the back animation.
    this.navCtrl.setDirection("back", true, "back");

    if (this.mainRouter.url == '/home')
    {
      this.router.route('/welcome');
    }
    else
    {
      // go back
      this.location.back();
    }
  }

}
