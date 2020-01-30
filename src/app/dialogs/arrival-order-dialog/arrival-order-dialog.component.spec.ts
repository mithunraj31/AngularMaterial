import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalOrderDialogComponent } from './arrival-order-dialog.component';

describe('ArrivalOrderDialogComponent', () => {
  let component: ArrivalOrderDialogComponent;
  let fixture: ComponentFixture<ArrivalOrderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivalOrderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivalOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
