import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubmitAudioPage } from './submit-audio.page';

describe('SubmitAudioPage', () => {
  let component: SubmitAudioPage;
  let fixture: ComponentFixture<SubmitAudioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitAudioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitAudioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
