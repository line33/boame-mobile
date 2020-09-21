import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendAFeedbackPageRoutingModule } from './send-a-feedback-routing.module';

import { SendAFeedbackPage } from './send-a-feedback.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SendAFeedbackPageRoutingModule
  ],
  declarations: [SendAFeedbackPage]
})
export class SendAFeedbackPageModule {}
