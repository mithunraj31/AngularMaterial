import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutgoingShipmentsComponent } from './outgoing-shipments.component';

describe('OutgoingShipmentsComponent', () => {
  let component: OutgoingShipmentsComponent;
  let fixture: ComponentFixture<OutgoingShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutgoingShipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutgoingShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
