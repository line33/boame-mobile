import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitVideoPageRoutingModule } from './submit-video-routing.module';

import { SubmitVideoPage } from './submit-video.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SubmitVideoPageRoutingModule
  ],
  declarations: [SubmitVideoPage]
})
export class SubmitVideoPageModule {}
