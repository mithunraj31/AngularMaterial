import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOutgoingShipmentComponent } from './add-outgoing-shipment.component';

describe('AddOutgoingShipmentComponent', () => {
  let component: AddOutgoingShipmentComponent;
  let fixture: ComponentFixture<AddOutgoingShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOutgoingShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOutgoingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
