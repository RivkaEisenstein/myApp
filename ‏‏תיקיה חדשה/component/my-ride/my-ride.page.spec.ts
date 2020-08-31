import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyRidePage } from './my-ride.page';

describe('MyRidePage', () => {
  let component: MyRidePage;
  let fixture: ComponentFixture<MyRidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRidePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyRidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
