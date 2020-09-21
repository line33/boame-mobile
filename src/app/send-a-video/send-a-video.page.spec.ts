import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendAVideoPage } from './send-a-video.page';

describe('SendAVideoPage', () => {
  let component: SendAVideoPage;
  let fixture: ComponentFixture<SendAVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendAVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendAVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
