import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoInfoPage } from './video-info.page';

describe('VideoInfoPage', () => {
  let component: VideoInfoPage;
  let fixture: ComponentFixture<VideoInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
