import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WatchVideoPage } from './watch-video.page';

describe('WatchVideoPage', () => {
  let component: WatchVideoPage;
  let fixture: ComponentFixture<WatchVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
