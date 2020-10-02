import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitAudioPageRoutingModule } from './submit-audio-routing.module';

import { SubmitAudioPage } from './submit-audio.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SubmitAudioPageRoutingModule
  ],
  declarations: [SubmitAudioPage]
})
export class SubmitAudioPageModule {}
