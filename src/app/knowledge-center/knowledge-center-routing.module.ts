import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KnowledgeCenterPage } from './knowledge-center.page';

const routes: Routes = [
  {
    path: '',
    component: KnowledgeCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KnowledgeCenterPageRoutingModule {}
