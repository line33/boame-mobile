import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnlineCounselorsPageRoutingModule } from './online-counselors-routing.module';

import { OnlineCounselorsPage } from './online-counselors.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    OnlineCounselorsPageRoutingModule
  ],
  declarations: [OnlineCounselorsPage]
})
export class OnlineCounselorsPageModule {}
