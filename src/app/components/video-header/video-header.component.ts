import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from '../go-back/go-back.component';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.scss'],
})
export class VideoHeaderComponent implements OnInit {

  constructor(private backComponent : GoBackComponent) { }

  ngOnInit() {}

  goback()
  {
     this.backComponent.goback();
  }

}
