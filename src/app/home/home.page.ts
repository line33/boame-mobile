import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent) content: IonContent;

  constructor(private router : Router) { }

  ngOnInit() {
    
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    AppComponent.isLoggedIn = false;
    this.scrollToTop();
  }

  login()
  {
    AppComponent.isLoggedIn = true;
    this.router.navigate(['/homescreen']);
  }

}
