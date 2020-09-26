import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompleteResetPage } from './complete-reset.page';

describe('CompleteResetPage', () => {
  let component: CompleteResetPage;
  let fixture: ComponentFixture<CompleteResetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteResetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
