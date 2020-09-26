import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WatchVideoPageRoutingModule } from './watch-video-routing.module';

import { WatchVideoPage } from './watch-video.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    WatchVideoPageRoutingModule
  ],
  declarations: [WatchVideoPage]
})
export class WatchVideoPageModule {}
