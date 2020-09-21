import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteersPageRoutingModule } from './volunteers-routing.module';

import { VolunteersPage } from './volunteers.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    VolunteersPageRoutingModule
  ],
  declarations: [VolunteersPage]
})
export class VolunteersPageModule {}
