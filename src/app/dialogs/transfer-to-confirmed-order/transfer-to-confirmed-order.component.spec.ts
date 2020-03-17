import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferToConfirmedOrderComponent } from './transfer-to-confirmed-order.component';

describe('TransferToConfirmedOrderComponent', () => {
  let component: TransferToConfirmedOrderComponent;
  let fixture: ComponentFixture<TransferToConfirmedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferToConfirmedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferToConfirmedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
