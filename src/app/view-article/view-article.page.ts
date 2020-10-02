import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RouterService } from '../services/router.service';
import { CacheService } from '../services/cache.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.page.html',
  styleUrls: ['./view-article.page.scss'],
})
export class ViewArticlePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
  article : any = {};
  storageUrl : string = '';

  constructor(private router : RouterService, private cache : CacheService) {
    this.router.getData((data:any)=>{
      if (typeof data.article == 'undefined') return this.router.route('/articles');
      // push article
      this.article = data.article;
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

  loadImage(image:string)
  {
    return AppComponent.storageUrl + '/' + image;
  }

}
