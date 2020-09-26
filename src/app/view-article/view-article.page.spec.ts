import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewArticlePage } from './view-article.page';

describe('ViewArticlePage', () => {
  let component: ViewArticlePage;
  let fixture: ComponentFixture<ViewArticlePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArticlePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewArticlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
