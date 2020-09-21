import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportCasePage } from './report-case.page';

describe('ReportCasePage', () => {
  let component: ReportCasePage;
  let fixture: ComponentFixture<ReportCasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportCasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
