import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyRidesPage } from './my-rides.page';

describe('MyRidesPage', () => {
  let component: MyRidesPage;
  let fixture: ComponentFixture<MyRidesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRidesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyRidesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
