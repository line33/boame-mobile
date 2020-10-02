import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerInfoPage } from './volunteer-info.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerInfoPageRoutingModule {}
