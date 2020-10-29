import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { NetworkService } from '../services/network.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-cases-assigned',
  templateUrl: './cases-assigned.page.html',
  styleUrls: ['./cases-assigned.page.scss'],
})
export class CasesAssignedPage implements OnInit {

  loaded : boolean = false;
  cases : any = [];

  constructor(private network : NetworkService, private router : RouterService,
    private loader : LoaderComponent) {
    // make request
    this.getCases();
  }

  ngOnInit() {
  }

  getCases()
  {
    // get id
    let accountid = 16;

    if (AppComponent.accountInformation != null)
    {
      if (typeof AppComponent.accountInformation.account == 'object') accountid = AppComponent.accountInformation.account.accountid;
    }

    // make request
    this.network.get('cases/assigned/' + accountid).then((res : any)  => {

      // do we have something
      if (res.data.status == 'success') this.cases = res.data.cases;

      // we good
      this.loaded = true;

    });
  } 

  loadImage(account:any)
  {
    // load display image
    if (typeof account.account == 'object') return AppComponent.storageUrl + '/' + account.account.display_image;

    // load dummy image
    return AppComponent.storageUrl + '/generic_avatar.png';
  }

  getName(account:any)
  {
    // load first and last name
    if (typeof account.account == 'object') return account.account.lastname + ' ' + account.account.firstname;

    // load default
    return account.account;
  }

  gotoCase(caseRow:any)
  {
    this.loader.show(()=>{
      this.router.route('/view-case-assigned', {row : caseRow});
    });
  }
}
