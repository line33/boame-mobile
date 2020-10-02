import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { CacheService } from '../services/cache.service';
import { NetworkService } from '../services/network.service';
import { LoaderComponent } from '../components/loader/loader.component';
import { AlertComponent } from '../components/alert/alert.component';
import { RouterService } from '../services/router.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.page.html',
  styleUrls: ['./volunteers.page.scss'],
})
export class VolunteersPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  positions : any = [];
  volunteers : any = [];
  storageUrl : any = '';
  static fetchedVolunteers : any = [];

  constructor(private cache : CacheService, private network : NetworkService,
    private loader : LoaderComponent, private alert : AlertComponent,
    private router : RouterService) {
    // load positions
    this.cache.getVolunteerPosition().then((positions : any) => {
      this.positions = positions;
    });
  }

  ngOnInit() {

    // fetch all
    if (VolunteersPage.fetchedVolunteers.length == 0)
    {
      // make query for 50
      this.loader.show(()=>{

        this.network.headers = {'x-query-limits' : '0,50'};

        // open connection
        this.network.get('volunteer/').then((res:any)=>{
          if (res.data.status == 'success')
          {
            this.volunteers = res.data.records;
            // set now
            VolunteersPage.fetchedVolunteers = this.volunteers;
          }
          else
          {
            this.alert.show(res.data.message);
          }

          this.loader.hide();
        });
      }); 
    }
    else
    {
      this.volunteers = VolunteersPage.fetchedVolunteers;
    }
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
  }

  trimBio(content : string)
  {
    return content.substr(0, 40);
  }

  loadImage(imageName:string)
  {
    return AppComponent.storageUrl + '/' + imageName;
  }

  info(volunteer:any)
  {
    this.router.route('/volunteer-info', {
      info : volunteer
    });
  }

}
