import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { CacheService } from '../services/cache.service';
import { NetworkService } from '../services/network.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-video-info',
  templateUrl: './video-info.page.html',
  styleUrls: ['./video-info.page.scss'],
})
export class VideoInfoPage implements OnInit {

  video : any = {};
  storageUrl : string = '';

  constructor(public router : RouterService, private cache : CacheService,
    private network : NetworkService) {
    this.router.getData((data:any)=>{
      this.video = data.video;
    });
  }

  loadImage(image:string)
  {
    return AppComponent.storageUrl + '/' + image;
  }

  watch()
  {
    // update views
    this.network.get('library/video/' + this.video.videospublishedid);

    // watch now
    this.router.route('/watch-video', {
      video : this.video
    });
  }

  ngOnInit() {
  }

}
