import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { CacheService } from '../services/cache.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-volunteer-info',
  templateUrl: './volunteer-info.page.html',
  styleUrls: ['./volunteer-info.page.scss'],
})
export class VolunteerInfoPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  firstname : string = '';
  lastname : string = '';
  position : string = '';
  storageUrl : string = '';
  image : string = '';
  biography : string = '';

  constructor(private cache : CacheService, private router : RouterService) {
    this.router.getData((route:any)=>{
      this.firstname = route.info.firstname;
      this.lastname = route.info.lastname;
      this.position = route.info.information.position;
      this.image = route.info.display_image;
      this.biography = route.info.information.biography;
    });
  }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

  loadImage(imageName:string)
  {
    return AppComponent.storageUrl + '/' + imageName;
  }

}
