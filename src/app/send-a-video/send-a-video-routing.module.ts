import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendAVideoPage } from './send-a-video.page';

const routes: Routes = [
  {
    path: '',
    component: SendAVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendAVideoPageRoutingModule {}
