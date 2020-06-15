import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KittingScheduleComponent } from './kitting-schedule.component';

describe('KittingScheduleComponent', () => {
  let component: KittingScheduleComponent;
  let fixture: ComponentFixture<KittingScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KittingScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KittingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
