import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendAnAudioPageRoutingModule } from './send-an-audio-routing.module';

import { SendAnAudioPage } from './send-an-audio.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SendAnAudioPageRoutingModule
  ],
  declarations: [SendAnAudioPage]
})
export class SendAnAudioPageModule {}
