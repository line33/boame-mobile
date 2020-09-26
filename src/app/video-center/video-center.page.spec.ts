import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoCenterPage } from './video-center.page';

describe('VideoCenterPage', () => {
  let component: VideoCenterPage;
  let fixture: ComponentFixture<VideoCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoCenterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
