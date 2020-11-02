import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-basic-footer',
  templateUrl: './basic-footer.component.html',
  styleUrls: ['./basic-footer.component.scss'],
})
export class BasicFooterComponent implements OnInit {

  navigations : any = [
    {
      route : '/homescreen',
      tag   : 'home-tab',
      state : '',
      image : '../../assets/img/footer-imgs/home-1.svg'
    },
    {
      route : '/knowledge-center',
      tag   : 'nav-tab',
      state : '',
      image : '../../assets/img/footer-imgs/navigation.svg'
    },
    {
      route : '/report-case',
      tag   : 'alert-tab',
      state : '',
      image : '../../assets/img/footer-imgs/alarm-1.svg'
    },
    {
      route : '/volunteers',
      tag   : 'volunteer-tab',
      state : '',
      image : '../../assets/img/footer-imgs/users.svg'
    },
    {
      route : '/online-counselors',
      tag   : 'chat-tab',
      state : '',
      image : '../../assets/img/footer-imgs/chat-49.svg'
    },
  ];

  home_screen_navigations : any = [
    {
      route : '/home',
      tag   : 'home-tab',
      state : '',
      image : '../../assets/img/footer-imgs/home-1.svg'
    },
    {
      route : '/knowledge-center',
      tag   : 'nav-tab',
      state : '',
      image : '../../assets/img/footer-imgs/navigation.svg'
    },
    {
      route : '/report-case',
      tag   : 'alert-tab',
      state : '',
      image : '../../assets/img/footer-imgs/alarm-1.svg'
    },
    {
      route : '/volunteers',
      tag   : 'volunteer-tab',
      state : '',
      image : '../../assets/img/footer-imgs/users.svg'
    },
    {
      route : '/online-counselors',
      tag   : 'chat-tab',
      state : '',
      image : '../../assets/img/footer-imgs/chat-49.svg'
    },
  ];

  logged_in_screen_nav : any = [
    {
      route : '/homescreen',
      tag   : 'home-tab',
      state : '',
      image : '../../assets/img/footer-imgs/home-1.svg'
    },
    {
      route : '/knowledge-center',
      tag   : 'nav-tab',
      state : '',
      image : '../../assets/img/footer-imgs/navigation.svg'
    },
    {
      route : '/profile',
      tag   : 'profile-tab',
      state : '',
      image : '../../assets/img/user.svg'
    },
    {
      route : '/volunteers',
      tag   : 'volunteer-tab',
      state : '',
      image : '../../assets/img/footer-imgs/users.svg'
    },
    {
      route : '/online-counselors',
      tag   : 'chat-tab',
      state : '',
      image : '../../assets/img/footer-imgs/chat-49.svg'
    },
  ];

  logged_in_screen_nav_other : any = [
    {
      route : '/homescreen',
      tag   : 'home-tab',
      state : '',
      image : '../../assets/img/footer-imgs/home-1.svg'
    },
    {
      route : '/knowledge-center',
      tag   : 'nav-tab',
      state : '',
      image : '../../assets/img/footer-imgs/navigation.svg'
    },
    {
      route : '/report-case',
      tag   : 'alert-tab',
      state : '',
      image : '../../assets/img/footer-imgs/alarm-1.svg'
    },
    {
      route : '/volunteers',
      tag   : 'volunteer-tab',
      state : '',
      image : '../../assets/img/footer-imgs/users.svg'
    },
    {
      route : '/online-counselors',
      tag   : 'chat-tab',
      state : '',
      image : '../../assets/img/footer-imgs/chat-49.svg'
    },
  ];

  non_reporter_logged_in_screen_nav : any = [
    {
      route : '/homescreen',
      tag   : 'home-tab',
      state : '',
      image : '../../assets/img/footer-imgs/home-1.svg'
    },
    {
      route : '/knowledge-center',
      tag   : 'nav-tab',
      state : '',
      image : '../../assets/img/footer-imgs/navigation.svg'
    },
    {
      route : '/profile',
      tag   : 'profile-tab',
      state : '',
      image : '../../assets/img/user.svg'
    },
    {
      route : '/cases-assigned',
      tag   : 'cases-tab',
      state : '',
      image : '../../assets/img/windows.svg'
    },
    {
      route : '/online-counselors',
      tag   : 'chat-tab',
      state : '',
      image : '../../assets/img/footer-imgs/chat-49.svg'
    },
  ];

  non_reporter_logged_in_screen_nav_other : any = [
    {
      route : '/homescreen',
      tag   : 'home-tab',
      state : '',
      image : '../../assets/img/footer-imgs/home-1.svg'
    },
    {
      route : '/knowledge-center',
      tag   : 'nav-tab',
      state : '',
      image : '../../assets/img/footer-imgs/navigation.svg'
    },
    {
      route : '/report-case',
      tag   : 'alert-tab',
      state : '',
      image : '../../assets/img/footer-imgs/alarm-1.svg'
    },
    {
      route : '/cases-assigned',
      tag   : 'cases-tab',
      state : '',
      image : '../../assets/img/windows.svg'
    },
    {
      route : '/online-counselors',
      tag   : 'chat-tab',
      state : '',
      image : '../../assets/img/footer-imgs/chat-49.svg'
    },
  ];

  activeNav : string = '';

  constructor(public router : Router, private routerService : RouterService) {

    // set nav
    if (AppComponent.defaultNavigation.length == 0) AppComponent.defaultNavigation = this.navigations;

    this.router.events.subscribe((event:any)=>{
      if (event instanceof NavigationEnd)
      {
        this.activeNav = '';
        const url = this.router.url;
        if (typeof AppComponent.menuTarget[url] !== 'undefined') this.activeNav = AppComponent.menuTarget[url];

        // change navigation
        // switch(url)
        // {
        //    case '/homescreen':
        //      this.navigations = (AppComponent.isLoggedIn === false) ? this.home_screen_navigations : this.logged_in_screen_nav;
        //    break;

        //    default:
        //      this.navigations = AppComponent.defaultNavigation;
        // }


        if (AppComponent.isLoggedIn === false)
        {
          this.navigations = AppComponent.defaultNavigation;
        }
        else
        {
          // check the account type
          if (AppComponent.accountInformation.account.accounttypeid == 4)
          {
            switch(url)
            {
              case '/homescreen':
                this.navigations = this.logged_in_screen_nav;
              break;

              default:
                this.navigations = this.logged_in_screen_nav_other;
            }
          }
          else
          {
            
            switch(url)
            {
              case '/homescreen':
                this.navigations = this.non_reporter_logged_in_screen_nav;
              break;

              default:
                this.navigations = this.non_reporter_logged_in_screen_nav_other;
            }
          }
        }

        // are we loggedin??
        if (AppComponent.accountInformation !== null)
        {
          this.navigations.forEach((obj:any, index:number) =>{
            if (obj.tag == 'chat-tab')
            {
              this.navigations[index].route = '/chat-list';
            }
          }); 
        }
      }
    });
  }

  ngOnInit() {
  }

  routeTo(route:string)
  {
    if (route == '/report-case')
    { 
      // use action sheet
      this.routerService.showReportSheet();
    }
    else
    {
      this.router.navigate([route]);
    }
    
  }

}
