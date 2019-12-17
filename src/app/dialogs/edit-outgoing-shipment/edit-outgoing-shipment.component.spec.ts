import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOutgoingShipmentComponent } from './edit-outgoing-shipment.component';

describe('EditOutgoingShipmentComponent', () => {
  let component: EditOutgoingShipmentComponent;
  let fixture: ComponentFixture<EditOutgoingShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOutgoingShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOutgoingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
