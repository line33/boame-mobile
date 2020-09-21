import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendAnAudioPage } from './send-an-audio.page';

describe('SendAnAudioPage', () => {
  let component: SendAnAudioPage;
  let fixture: ComponentFixture<SendAnAudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendAnAudioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendAnAudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
