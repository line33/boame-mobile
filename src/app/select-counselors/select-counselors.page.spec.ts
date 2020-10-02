import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCounselorsPage } from './select-counselors.page';

describe('SelectCounselorsPage', () => {
  let component: SelectCounselorsPage;
  let fixture: ComponentFixture<SelectCounselorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCounselorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCounselorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
