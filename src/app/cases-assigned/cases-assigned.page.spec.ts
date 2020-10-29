import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CasesAssignedPage } from './cases-assigned.page';

describe('CasesAssignedPage', () => {
  let component: CasesAssignedPage;
  let fixture: ComponentFixture<CasesAssignedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesAssignedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CasesAssignedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
