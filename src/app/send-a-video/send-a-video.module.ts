import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendAVideoPageRoutingModule } from './send-a-video-routing.module';

import { SendAVideoPage } from './send-a-video.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SendAVideoPageRoutingModule
  ],
  declarations: [SendAVideoPage]
})
export class SendAVideoPageModule {}
