import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteVolunteerRegPageRoutingModule } from './complete-volunteer-reg-routing.module';

import { CompleteVolunteerRegPage } from './complete-volunteer-reg.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    CompleteVolunteerRegPageRoutingModule
  ],
  declarations: [CompleteVolunteerRegPage]
})
export class CompleteVolunteerRegPageModule {}
