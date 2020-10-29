import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewCaseAssignedPageRoutingModule } from './view-case-assigned-routing.module';

import { ViewCaseAssignedPage } from './view-case-assigned.page';
import { ComponentModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ViewCaseAssignedPageRoutingModule
  ],
  declarations: [ViewCaseAssignedPage]
})
export class ViewCaseAssignedPageModule {}
