import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasesAssignedPage } from './cases-assigned.page';

const routes: Routes = [
  {
    path: '',
    component: CasesAssignedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasesAssignedPageRoutingModule {}
