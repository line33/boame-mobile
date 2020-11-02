import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { CacheService } from '../services/cache.service';
import { ChatService } from '../services/chat.service';
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
  accountid : number = 0;

  constructor(private cache : CacheService, private router : RouterService,
    private loader : LoaderComponent, private chat : ChatService) {
    this.router.getData((route:any)=>{
      this.firstname = route.info.firstname;
      this.lastname = route.info.lastname;
      this.position = route.info.information.position;
      this.image = route.info.display_image;
      this.biography = route.info.information.biography;
      this.accountid = route.info.accountid;
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

  userIsUnique()
  {
    // @var bool unique
    let unique = true;

    // check if is loggedin
    if (AppComponent.accountInformation != null)
    {
      unique = (AppComponent.accountInformation.account.accountid == this.accountid) ? false : unique;
    }

    // return bool
    return unique;
  }

  startChat()
  {
    if (this.userIsUnique())
    {
      this.loader.show();

      setTimeout(()=>{
        
        this.chat.requestChat(this.accountid);

        // wait for a response
        this.chat.getRequestChat().subscribe(()=>{

          this.router.route('/chat-screen', {
            chat : {
              firstname     : this.firstname,
              lastname      : this.lastname,
              accountid     : this.accountid,
              display_image : this.image
            }
          });

          // hide loader
          this.loader.hide();
          
        });
      },1000);
    }
  }

}
