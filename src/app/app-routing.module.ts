import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'homescreen',
    loadChildren: () => import('./homescreen/homescreen.module').then( m => m.HomescreenPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'report-case',
    loadChildren: () => import('./report-case/report-case.module').then( m => m.ReportCasePageModule)
  },
  {
    path: 'become-a-volunteer',
    loadChildren: () => import('./become-a-volunteer/become-a-volunteer.module').then( m => m.BecomeAVolunteerPageModule)
  },
  {
    path: 'complete-volunteer-reg',
    loadChildren: () => import('./complete-volunteer-reg/complete-volunteer-reg.module').then( m => m.CompleteVolunteerRegPageModule)
  },
  {
    path: 'send-a-video',
    loadChildren: () => import('./send-a-video/send-a-video.module').then( m => m.SendAVideoPageModule)
  },
  {
    path: 'send-an-audio',
    loadChildren: () => import('./send-an-audio/send-an-audio.module').then( m => m.SendAnAudioPageModule)
  },
  {
    path: 'send-a-message',
    loadChildren: () => import('./send-a-message/send-a-message.module').then( m => m.SendAMessagePageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'volunteers',
    loadChildren: () => import('./volunteers/volunteers.module').then( m => m.VolunteersPageModule)
  },
  {
    path: 'knowledge-center',
    loadChildren: () => import('./knowledge-center/knowledge-center.module').then( m => m.KnowledgeCenterPageModule)
  },
  {
    path: 'send-a-feedback',
    loadChildren: () => import('./send-a-feedback/send-a-feedback.module').then( m => m.SendAFeedbackPageModule)
  },
  {
    path: 'online-counselors',
    loadChildren: () => import('./online-counselors/online-counselors.module').then( m => m.OnlineCounselorsPageModule)
  },
  {
    path: 'video-center',
    loadChildren: () => import('./video-center/video-center.module').then( m => m.VideoCenterPageModule)
  },
  {
    path: 'video-info',
    loadChildren: () => import('./video-info/video-info.module').then( m => m.VideoInfoPageModule)
  },
  {
    path: 'watch-video',
    loadChildren: () => import('./watch-video/watch-video.module').then( m => m.WatchVideoPageModule)
  },
  {
    path: 'articles',
    loadChildren: () => import('./articles/articles.module').then( m => m.ArticlesPageModule)
  },
  {
    path: 'view-article',
    loadChildren: () => import('./view-article/view-article.module').then( m => m.ViewArticlePageModule)
  },
  {
    path: 'complete-reset',
    loadChildren: () => import('./complete-reset/complete-reset.module').then( m => m.CompleteResetPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
