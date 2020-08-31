import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedbekPage } from './feedbek.page';

describe('FeedbekPage', () => {
  let component: FeedbekPage;
  let fixture: ComponentFixture<FeedbekPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbekPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbekPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
