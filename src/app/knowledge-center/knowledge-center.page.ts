import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LoaderComponent } from '../components/loader/loader.component';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-knowledge-center',
  templateUrl: './knowledge-center.page.html',
  styleUrls: ['./knowledge-center.page.scss'],
})
export class KnowledgeCenterPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  constructor(private loader : LoaderComponent, private router : RouterService) { }

  ngOnInit() {
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

  viewVideo()
  {
    this.loader.show(()=>{
      this.router.route('/video-center');
    });
  }
}
