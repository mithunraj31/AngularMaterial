import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FulfillOrderDialogComponent } from './fulfill-order-dialog.component';

describe('FulfillOrderDialogComponent', () => {
  let component: FulfillOrderDialogComponent;
  let fixture: ComponentFixture<FulfillOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FulfillOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FulfillOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
