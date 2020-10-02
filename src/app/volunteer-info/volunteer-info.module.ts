import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerInfoPageRoutingModule } from './volunteer-info-routing.module';

import { VolunteerInfoPage } from './volunteer-info.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    VolunteerInfoPageRoutingModule
  ],
  declarations: [VolunteerInfoPage]
})
export class VolunteerInfoPageModule {}
