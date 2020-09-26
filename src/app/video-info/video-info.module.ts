import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoInfoPageRoutingModule } from './video-info-routing.module';

import { VideoInfoPage } from './video-info.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    VideoInfoPageRoutingModule
  ],
  declarations: [VideoInfoPage]
})
export class VideoInfoPageModule {}
