import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KnowledgeCenterPageRoutingModule } from './knowledge-center-routing.module';

import { KnowledgeCenterPage } from './knowledge-center.page';
import {ComponentModule} from '../components/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentModule,
    KnowledgeCenterPageRoutingModule
  ],
  declarations: [KnowledgeCenterPage]
})
export class KnowledgeCenterPageModule {}
