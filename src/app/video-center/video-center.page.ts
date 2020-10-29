import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { LoaderComponent } from '../components/loader/loader.component';
import { AlertComponent } from '../components/alert/alert.component';
import { NetworkService } from '../services/network.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.page.html',
  styleUrls: ['./video-center.page.scss'],
})
export class VideoCenterPage implements OnInit {

  static isPreviewed : boolean = false;
  static allVideos : any = [];
  videos : any = [];

  @ViewChild(IonContent) content: IonContent;

  constructor(private loader : LoaderComponent,
    private alert : AlertComponent, private network : NetworkService,
    private router : RouterService) {
    VideoCenterPage.isPreviewed = false;
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ngOnInit() {
    
  }

  info(video:any)
  {
    // show info
    this.router.route('/video-info', {
      video : video
    });
  }

  loadVideos()
  {
    if (VideoCenterPage.allVideos.length == 0)
    {
      this.network.headers = {'x-query-limits' : '0,50'};
      this.network.get('library/videos').then((res:any)=>{
        if (res.data.status == 'error')
        {
          this.alert.show(res.data.message, ()=>{
            this.router.route('/knowledge-center');
            this.loader.hide();
          });
        }
        else
        {
          this.videos = res.data.videos;
          VideoCenterPage.allVideos = this.videos;
          this.loader.hide();
        }
      });
    }
    else
    {
      this.videos = VideoCenterPage.allVideos;
      this.loader.hide();
    }
  }

  ionViewDidEnter()
  {
    if (VideoCenterPage.isPreviewed === false) this.scrollToTop();

    // update now
    VideoCenterPage.isPreviewed = true;

    // load videos
    this.loadVideos();
    
  }

}
