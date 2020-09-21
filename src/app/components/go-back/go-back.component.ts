import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
})
export class GoBackComponent implements OnInit {

  constructor(private location : Location, private navCtrl : NavController) { }

  ngOnInit() {}

  goback()
  {
    // Provide the back animation.
    this.navCtrl.setDirection("back", true, "back");

    // go back
    this.location.back();
  }

}
