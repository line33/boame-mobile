import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchVideoPage } from './watch-video.page';

const routes: Routes = [
  {
    path: '',
    component: WatchVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchVideoPageRoutingModule {}
