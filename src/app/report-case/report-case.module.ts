import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportCasePageRoutingModule } from './report-case-routing.module';

import { ReportCasePage } from './report-case.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ReportCasePageRoutingModule
  ],
  declarations: [ReportCasePage]
})
export class ReportCasePageModule {}
