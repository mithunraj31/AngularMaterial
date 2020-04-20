import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSetConfirmationComponent } from './add-product-set-confirmation.component';

describe('AddProductSetConfirmationComponent', () => {
  let component: AddProductSetConfirmationComponent;
  let fixture: ComponentFixture<AddProductSetConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductSetConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductSetConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
