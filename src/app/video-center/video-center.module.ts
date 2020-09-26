import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCenterPageRoutingModule } from './video-center-routing.module';

import { VideoCenterPage } from './video-center.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    VideoCenterPageRoutingModule
  ],
  declarations: [VideoCenterPage]
})
export class VideoCenterPageModule {}
