import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubmitAudioPage } from './submit-audio.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitAudioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmitAudioPageRoutingModule {}
