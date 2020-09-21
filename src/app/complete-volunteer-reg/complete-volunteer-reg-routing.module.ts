import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteVolunteerRegPage } from './complete-volunteer-reg.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteVolunteerRegPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteVolunteerRegPageRoutingModule {}
