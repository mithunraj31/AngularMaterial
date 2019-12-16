import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncomingShipmentComponent } from './edit-incoming-shipment.component';

describe('EditIncomingShipmentComponent', () => {
  let component: EditIncomingShipmentComponent;
  let fixture: ComponentFixture<EditIncomingShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIncomingShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncomingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
