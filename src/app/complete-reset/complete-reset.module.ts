import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteResetPageRoutingModule } from './complete-reset-routing.module';

import { CompleteResetPage } from './complete-reset.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    CompleteResetPageRoutingModule
  ],
  declarations: [CompleteResetPage]
})
export class CompleteResetPageModule {}
