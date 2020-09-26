import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from '../go-back/go-back.component';

@Component({
  selector: 'app-article-header',
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss'],
})
export class ArticleHeaderComponent implements OnInit {

  constructor(private backComponent : GoBackComponent) { }

  ngOnInit() {}

  goback()
  {
     this.backComponent.goback();
  }

}
