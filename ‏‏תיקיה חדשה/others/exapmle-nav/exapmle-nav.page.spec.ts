import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExapmleNavPage } from './exapmle-nav.page';

describe('ExapmleNavPage', () => {
  let component: ExapmleNavPage;
  let fixture: ComponentFixture<ExapmleNavPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExapmleNavPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExapmleNavPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
