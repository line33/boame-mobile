import {NgModule, Input} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GoBackComponent } from './go-back/go-back.component';
import { BasicHeaderComponent } from './basic-header/basic-header.component';
import { BasicFooterComponent } from './basic-footer/basic-footer.component';
import { CommonModule } from '@angular/common';
import { VolunteerHeaderComponent } from './volunteer-header/volunteer-header.component';
import { VideoHeaderComponent } from './video-header/video-header.component';
import { ArticleHeaderComponent } from './article-header/article-header.component';
import { LoaderComponent } from './loader/loader.component';
import { AlertComponent } from './alert/alert.component';
import { CounselorChatHeaderComponent } from './counselor-chat-header/counselor-chat-header.component';

@NgModule({
    imports : [
        IonicModule, CommonModule
    ],
    declarations:[GoBackComponent, BasicHeaderComponent, BasicFooterComponent, VolunteerHeaderComponent, VideoHeaderComponent, ArticleHeaderComponent,
    LoaderComponent, AlertComponent, CounselorChatHeaderComponent],
    exports:[GoBackComponent, BasicHeaderComponent, BasicFooterComponent, VolunteerHeaderComponent, VideoHeaderComponent, ArticleHeaderComponent,
    LoaderComponent, AlertComponent, CounselorChatHeaderComponent]
})
export class ComponentModule{
    @Input() page : string;
}