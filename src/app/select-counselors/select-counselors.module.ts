import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCounselorsPageRoutingModule } from './select-counselors-routing.module';

import { SelectCounselorsPage } from './select-counselors.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SelectCounselorsPageRoutingModule
  ],
  declarations: [SelectCounselorsPage]
})
export class SelectCounselorsPageModule {}
