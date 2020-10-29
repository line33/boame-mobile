import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatScreenPageRoutingModule } from './chat-screen-routing.module';

import { ChatScreenPage } from './chat-screen.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    ChatScreenPageRoutingModule
  ],
  declarations: [ChatScreenPage]
})
export class ChatScreenPageModule {}
