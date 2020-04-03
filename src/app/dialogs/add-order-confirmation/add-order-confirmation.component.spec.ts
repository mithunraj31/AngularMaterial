import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderConfirmationComponent } from './add-order-confirmation.component';

describe('AddOrderConfirmationComponent', () => {
  let component: AddOrderConfirmationComponent;
  let fixture: ComponentFixture<AddOrderConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
