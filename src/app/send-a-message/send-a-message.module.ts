import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendAMessagePageRoutingModule } from './send-a-message-routing.module';

import { SendAMessagePage } from './send-a-message.page';
import {ComponentModule} from '../components/component.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    SendAMessagePageRoutingModule
  ],
  declarations: [SendAMessagePage]
})
export class SendAMessagePageModule {}
