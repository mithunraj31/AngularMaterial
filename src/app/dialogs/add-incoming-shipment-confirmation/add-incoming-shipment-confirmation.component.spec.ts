import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomingShipmentConfirmationComponent } from './add-incoming-shipment-confirmation.component';

describe('AddIncomingShipmentConfirmationComponent', () => {
  let component: AddIncomingShipmentConfirmationComponent;
  let fixture: ComponentFixture<AddIncomingShipmentConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncomingShipmentConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncomingShipmentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
