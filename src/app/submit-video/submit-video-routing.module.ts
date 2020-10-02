import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitVideoPage } from './submit-video.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitVideoPageRoutingModule {}
