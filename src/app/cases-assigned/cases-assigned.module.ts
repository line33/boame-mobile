import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasesAssignedPageRoutingModule } from './cases-assigned-routing.module';

import { CasesAssignedPage } from './cases-assigned.page';
import { ComponentModule } from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    CasesAssignedPageRoutingModule
  ],
  declarations: [CasesAssignedPage]
})
export class CasesAssignedPageModule {}
