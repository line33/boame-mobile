import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCaseAssignedPage } from './view-case-assigned.page';

describe('ViewCaseAssignedPage', () => {
  let component: ViewCaseAssignedPage;
  let fixture: ComponentFixture<ViewCaseAssignedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCaseAssignedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCaseAssignedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
