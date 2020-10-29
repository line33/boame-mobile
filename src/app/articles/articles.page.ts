import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { NetworkService } from '../services/network.service';
import { AlertComponent } from '../components/alert/alert.component';
import { RouterService } from '../services/router.service';
import { CacheService } from '../services/cache.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  totalSlides : number = 0;
  currentSlide : any = '01';
  articles : any = [];
  static backupArticles : any = [];
  loaded : boolean = false;
  storageUrl : string = '';

  constructor(private network : NetworkService,
    private alert : AlertComponent, private router : RouterService,
    private cache : CacheService) { 

    // load all articles
    this.loadAllArticles();
  }

  ngOnInit() {
  }

  loadAllArticles()
  {
    if (ArticlesPage.backupArticles.length == 0)
    {
      // add limts
      this.network.headers = {
        'x-query-limits' : '0,50'
      };

      // make query
      this.network.get('library/articles').then((res:any)=>{
        // if (res.data.status == 'error')
        // {
        //   this.alert.show(res.data.message, ()=>{
        //     this.router.route('/knowledge-center');
        //   });
        // }
        // else
        // {
        //   // this.articles = res.data.articles;
        //   //ArticlesPage.backupArticles = this.articles;
        //   //this.loaded = true;
        // }

        const articles = [];

        res.data.articles.forEach((e)=>{
          articles.push(e);
        });

        this.articles = articles;
        this.loaded = true;
      });
    }
    else
    {
      this.articles = ArticlesPage.backupArticles;
      this.loaded = true;
    }
  }

  slideChanged(ev:any)
  {
    this.slides.getActiveIndex().then((number:any)=>{
      // add one
      number += 1;
      if (number <= 9) number = '0' + number;
      this.currentSlide = number;

      // call load more
      if ((Number(number) + 1) == this.totalSlides)
      {
        this.loadMoreSlides();
      }
    });
  }

  loadMoreSlides()
  { 
  }

  loadImage(image:string)
  {
    return AppComponent.storageUrl + '/' + image;
  }

  load(article:any)
  {

    // make view request
    this.network.get('library/article/' + article.articleid);

    // view article
    this.router.route('/view-article', {
      article : article
    });
  }

  slideLoaded(ev:any)
  {
    // get total slides
    this.getTotalSlides(ev);
  }

  getTotalSlides(ev:any)
  {
    this.slides.length().then((len:any)=>{
      this.totalSlides = len;
    });
  }

}
