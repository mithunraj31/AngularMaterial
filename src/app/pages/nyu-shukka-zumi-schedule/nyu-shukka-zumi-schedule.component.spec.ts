import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NyuShukkaZumiScheduleComponent } from './nyu-shukka-zumi-schedule.component';

describe('NyuShukkaZumiScheduleComponent', () => {
  let component: NyuShukkaZumiScheduleComponent;
  let fixture: ComponentFixture<NyuShukkaZumiScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NyuShukkaZumiScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NyuShukkaZumiScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
