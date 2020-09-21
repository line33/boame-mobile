import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendAMessagePage } from './send-a-message.page';

const routes: Routes = [
  {
    path: '',
    component: SendAMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendAMessagePageRoutingModule {}
