import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlineCounselorsPage } from './online-counselors.page';

const routes: Routes = [
  {
    path: '',
    component: OnlineCounselorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnlineCounselorsPageRoutingModule {}
