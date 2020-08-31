import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AaaPage } from './aaa.page';

describe('AaaPage', () => {
  let component: AaaPage;
  let fixture: ComponentFixture<AaaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AaaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AaaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
