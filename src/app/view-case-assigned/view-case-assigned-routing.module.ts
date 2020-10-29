import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCaseAssignedPage } from './view-case-assigned.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCaseAssignedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCaseAssignedPageRoutingModule {}
