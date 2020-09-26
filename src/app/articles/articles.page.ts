import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  totalSlides : number = 0;
  currentSlide : any = '01';

  constructor() { }

  ngOnInit() {
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
    console.log('load more slides');
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
