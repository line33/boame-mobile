import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCenterPage } from './video-center.page';

const routes: Routes = [
  {
    path: '',
    component: VideoCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCenterPageRoutingModule {}
