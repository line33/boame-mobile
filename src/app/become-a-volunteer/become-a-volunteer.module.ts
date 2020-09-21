import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BecomeAVolunteerPageRoutingModule } from './become-a-volunteer-routing.module';

import { BecomeAVolunteerPage } from './become-a-volunteer.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    BecomeAVolunteerPageRoutingModule
  ],
  declarations: [BecomeAVolunteerPage]
})
export class BecomeAVolunteerPageModule {}
