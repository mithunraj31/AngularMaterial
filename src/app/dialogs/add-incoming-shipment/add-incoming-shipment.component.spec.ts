import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomingShipmentComponent } from './add-incoming-shipment.component';

describe('AddIncomingShipmentComponent', () => {
  let component: AddIncomingShipmentComponent;
  let fixture: ComponentFixture<AddIncomingShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIncomingShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddIncomingShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
