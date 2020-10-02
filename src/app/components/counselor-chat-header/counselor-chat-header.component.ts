import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from '../go-back/go-back.component';

@Component({
  selector: 'app-counselor-chat-header',
  templateUrl: './counselor-chat-header.component.html',
  styleUrls: ['./counselor-chat-header.component.scss'],
})
export class CounselorChatHeaderComponent implements OnInit {

  constructor(private back : GoBackComponent) { }

  ngOnInit() {}

  goback()
  {
    this.back.goback();
  }

}
