import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendAnAudioPage } from './send-an-audio.page';

const routes: Routes = [
  {
    path: '',
    component: SendAnAudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendAnAudioPageRoutingModule {}
