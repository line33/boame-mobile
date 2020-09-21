import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnlineCounselorsPage } from './online-counselors.page';

describe('OnlineCounselorsPage', () => {
  let component: OnlineCounselorsPage;
  let fixture: ComponentFixture<OnlineCounselorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineCounselorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlineCounselorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
