import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCustomerDialogComponent } from './edit-customer-dialog.component';

describe('EditCustomerDialogComponent', () => {
  let component: EditCustomerDialogComponent;
  let fixture: ComponentFixture<EditCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
