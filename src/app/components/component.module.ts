import {NgModule, Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GoBackComponent } from './go-back/go-back.component';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { BasicFooterComponent } from './basic-footer/basic-footer.component';
import { CommonModule } from '@angular/common';
import { VolunteerHeaderComponent } from './volunteer-header/volunteer-header.component';

@NgModule({
    imports : [
        IonicModule, CommonModule
    ],
    declarations:[GoBackComponent, BasicHeaderComponent, BasicFooterComponent, VolunteerHeaderComponent],
    exports:[GoBackComponent, BasicHeaderComponent, BasicFooterComponent, VolunteerHeaderComponent]
})
export class ComponentModule{
    @Input() page : string;
}