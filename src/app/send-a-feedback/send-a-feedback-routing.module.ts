import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendAFeedbackPage } from './send-a-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: SendAFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendAFeedbackPageRoutingModule {}
