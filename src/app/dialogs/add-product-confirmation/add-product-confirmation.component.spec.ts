import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductConfirmationComponent } from './add-product-confirmation.component';

describe('AddProductConfirmationComponent', () => {
  let component: AddProductConfirmationComponent;
  let fixture: ComponentFixture<AddProductConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
