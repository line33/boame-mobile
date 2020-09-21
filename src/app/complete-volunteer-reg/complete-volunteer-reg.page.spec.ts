import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteVolunteerRegPage } from './complete-volunteer-reg.page';

describe('CompleteVolunteerRegPage', () => {
  let component: CompleteVolunteerRegPage;
  let fixture: ComponentFixture<CompleteVolunteerRegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteVolunteerRegPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteVolunteerRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
