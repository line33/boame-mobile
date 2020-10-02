import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectCounselorsPage } from './select-counselors.page';

const routes: Routes = [
  {
    path: '',
    component: SelectCounselorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCounselorsPageRoutingModule {}
