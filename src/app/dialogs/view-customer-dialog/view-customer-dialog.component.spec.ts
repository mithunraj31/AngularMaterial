import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerDialogComponent } from './view-customer-dialog.component';

describe('ViewCustomerDialogComponent', () => {
  let component: ViewCustomerDialogComponent;
  let fixture: ComponentFixture<ViewCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
