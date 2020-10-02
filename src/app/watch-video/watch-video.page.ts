import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { RouterService } from '../services/router.service';
import { CacheService } from '../services/cache.service';
import { AppComponent } from '../app.component';
import { NetworkService } from '../services/network.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.page.html',
  styleUrls: ['./watch-video.page.scss'],
})
export class WatchVideoPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  video : any = {}
  storageUrl : string = '';
  profile_image : string = '';
  total_likes : number = 0;
  total_dislikes : number = 0;
  static videoLiked : any = [];
  static videoDisLiked : any = [];

  constructor(private router : RouterService, private cache : CacheService,
    private network : NetworkService, private storage : Storage) {
    this.router.getData((data:any)=>{
      this.video = data.video;

      // add total likes
      this.total_likes = Number(data.video.attachment.total_likes);

      // add total dislikes
      this.total_dislikes = Number(data.video.attachment.total_dislikes);

      // get display image
      this.network.get('service/account/' + data.video.accountid).then((res:any)=>{
        if (res.data.status == 'success')
        {
          this.profile_image = (res.data.display_image == null) ? 'weki-icon.png' : res.data.display_image;
        }
      });
      
      // video liked
      if (WatchVideoPage.videoLiked.indexOf(data.video.videospublishedid) >= 0) this.total_likes += 1;

      // video disliked
      if (WatchVideoPage.videoDisLiked.indexOf(data.video.videospublishedid) >= 0) this.total_dislikes += 1;

    });

    // prepare storage
    this.storage.get('boame_video_activities').then((activity:any)=>{
      if (activity == null) this.storage.set('boame_video_activities', []);
    });
  }

  like()
  {
    this.storage.get('boame_video_activities').then((activity:any = [])=>{
      this.network.withAccount({}, (data:any)=>{
        const key = JSON.stringify(data) + ':' + this.video.videospublishedid;

        // check for key
        if (activity.indexOf(key) < 0)
        {
          activity.push(key);
          this.storage.set('boame_video_activities', activity);

          // increment like
          this.total_likes++;

          // like
          this.network.get('library/video/like/' + this.video.attachment.videoattachedid);

          // video liked.
          WatchVideoPage.videoLiked.push(this.video.videospublishedid);
        }
      });
    });
  }

  dislike()
  {
    this.storage.get('boame_video_activities').then((activity:any = [])=>{
      this.network.withAccount({}, (data:any)=>{
        const key = JSON.stringify(data) + ':' + this.video.videospublishedid;

        // check for key
        if (activity.indexOf(key) < 0)
        {
          activity.push(key);
          this.storage.set('boame_video_activities', activity);

          // increment dislike
          this.total_dislikes++;

          // dislike
          this.network.get('library/video/dislike/' + this.video.attachment.videoattachedid);

          // video liked.
          WatchVideoPage.videoDisLiked.push(this.video.videospublishedid);
        }
      });
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter()
  {
    
  }

  scrollToTop() {
    this.content.scrollToPoint(0, -10, 400);
  }

  ionViewDidEnter(){
    this.scrollToTop();
  }

  loadFile(file:string)
  {
    return AppComponent.storageUrl + '/' + file;
  }

}
