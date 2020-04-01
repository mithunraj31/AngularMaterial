import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerConfirmationComponent } from './add-customer-confirmation.component';

describe('AddCustomerConfirmationComponent', () => {
  let component: AddCustomerConfirmationComponent;
  let fixture: ComponentFixture<AddCustomerConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
