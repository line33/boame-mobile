import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { ChatService } from '../services/chat.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-view-case-assigned',
  templateUrl: './view-case-assigned.page.html',
  styleUrls: ['./view-case-assigned.page.scss'],
})
export class ViewCaseAssignedPage implements OnInit {

  caseRow : any = {};
  isReady : boolean = false;

  constructor(private router : RouterService, private loader : LoaderComponent,
    private chat : ChatService) {
    this.router.getData((data:any)=>{
      this.caseRow = data.row;
      this.isReady = true;
      this.loader.hide();
    });
  }

  ngOnInit() {
  }

  getFile(file:any)
  {
    return AppComponent.storageUrl + '/' + file;
  }

  startChat()
  {
    this.loader.show();

      setTimeout(()=>{
        // do we have an accountid
        let accountid : any = this.caseRow.accountid;

        // update device hash
        if (this.caseRow.accountid == 0) accountid = this.caseRow.devicehash;

        this.chat.requestChat(accountid);

        // get the chat data
        let chatData = {};

        // get data
        if (this.caseRow.accountid != 0)
        {
          chatData = {
              firstname     : this.caseRow.account.firstname,
              lastname      : this.caseRow.account.lastname,
              accountid     : this.caseRow.account.accountid,
              display_image : this.caseRow.account.display_image
          };
        }
        else
        {
          chatData = {
            firstname     : 'Annonymus',
            lastname      : this.caseRow.devicehash.substr(0, 5),
            accountid     : this.caseRow.devicehash,
            display_image : 'generic_avatar.png'
          };
        }

        // wait for a response
        this.chat.getRequestChat().subscribe((res)=>{
          this.router.route('/chat-screen', {
            chat : chatData
          });

          // hide loader
          this.loader.hide();
          
        });

      },1000);
  }

  getName()
  {
    // load first and last name
    if (typeof this.caseRow.account == 'object') return this.caseRow.account.lastname + '<br>' + this.caseRow.account.firstname;

    // load default
    return this.caseRow.account;
  }

}
