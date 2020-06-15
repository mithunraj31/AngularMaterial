import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingInfoComponent } from './incoming-info.component';

describe('IncomingInfoComponent', () => {
  let component: IncomingInfoComponent;
  let fixture: ComponentFixture<IncomingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
