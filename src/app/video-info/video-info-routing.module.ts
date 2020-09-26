import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoInfoPage } from './video-info.page';

const routes: Routes = [
  {
    path: '',
    component: VideoInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoInfoPageRoutingModule {}
