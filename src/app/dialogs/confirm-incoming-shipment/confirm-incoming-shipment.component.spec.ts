import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmIncomingShipmentComponent } from './confirm-incoming-shipment.component';

describe('ConfirmIncomingShipmentComponent', () => {
  let component: ConfirmIncomingShipmentComponent;
  let fixture: ComponentFixture<ConfirmIncomingShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmIncomingShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmIncomingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
