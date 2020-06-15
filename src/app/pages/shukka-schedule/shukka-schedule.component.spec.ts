import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShukkaScheduleComponent } from './shukka-schedule.component';

describe('ShukkaScheduleComponent', () => {
  let component: ShukkaScheduleComponent;
  let fixture: ComponentFixture<ShukkaScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShukkaScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShukkaScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
