import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendAMessagePage } from './send-a-message.page';

describe('SendAMessagePage', () => {
  let component: SendAMessagePage;
  let fixture: ComponentFixture<SendAMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendAMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendAMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
