import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubmitVideoPage } from './submit-video.page';

describe('SubmitVideoPage', () => {
  let component: SubmitVideoPage;
  let fixture: ComponentFixture<SubmitVideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitVideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitVideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
