import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AlertComponent } from '../components/alert/alert.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { CacheService } from '../services/cache.service';
import { ChatService } from '../services/chat.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-select-counselors',
  templateUrl: './select-counselors.page.html',
  styleUrls: ['./select-counselors.page.scss'],
})
export class SelectCounselorsPage implements OnInit {

  counsellors : any = [];

  constructor(private router : RouterService, private cache : CacheService, private chat : ChatService,
    private loader : LoaderComponent, private alert : AlertComponent) { }

  ngOnInit() {

    // redirect unauthorized user
    //if (AppComponent.accountInformation == null) return this.router.route('/welcome');

    // get chat list 
    this.cache.getCounsellors().then((counsellors:any)=>{

      this.addCount(counsellors);

      // push 
      this.counsellors = counsellors;

      // update list
      this.chat.loadCounsellors();

      this.chat.getCounsellors().subscribe((response:any)=>{

        const getResponse = JSON.parse(response);

        if (getResponse.counsellors.length > 0)
        {
          this.addCount(getResponse.counsellors);

          // add counsellors
          this.counsellors = getResponse.counsellors;

          // cache response
          this.cache.cacheCounsellors(this.counsellors);
        }

      });


    }).catch((error)=>{

      // start loader
      // this.loader.show();

      // load counsellors
      this.chat.loadCounsellors();

      this.chat.getCounsellors().subscribe((response:any)=>{

        const getResponse = JSON.parse(response);

        // are we good 
        if (getResponse.counsellors.length > 0)
        {
          this.addCount(getResponse.counsellors);

          // add counsellors
          this.counsellors = getResponse.counsellors;

          // cache response
          this.cache.cacheCounsellors(this.counsellors);
        }
        else
        {
          this.alert.show('No avaliable counsellors at this time. Please check back later.');
        }

        // hide loader
        //this.loader.hide();

      }, (err:any) => {
        console.log('Socket Error : ', err);
        //this.loader.hide();
      });
    }).catch((err:any)=>{
      
    });

  }

  // add counselors cound
  addCount(counsellors:any)
  {
    const countElement = document.querySelector('.counselors-count');

    // update
    if (countElement !== null)
    {
      countElement.innerHTML = (counsellors.length > 1) ? counsellors.length + ' counsellors' : counsellors.length + ' counselor';
    }
  }

  // get cache image
  getImage(image:string)
  {
    return AppComponent.storageUrl + '/' + image;
  }

  // start chat
  startChat(counselor:any)
  {
    let canContinue : boolean = true;

    if (AppComponent.accountInformation != null)
    {
      // check 
      if (counselor.accountid == AppComponent.accountInformation.account.accountid) canContinue = false;
    }    

    if (canContinue)
    {
      this.loader.show();

      setTimeout(()=>{
        this.chat.requestChat(counselor.accountid);

        // wait for a response
        this.chat.getRequestChat().subscribe(()=>{
          this.router.route('/chat-screen', {
            chat : counselor
          });
          this.loader.hide();
        });
      },1000);
    }
  }

}
