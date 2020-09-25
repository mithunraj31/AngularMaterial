import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorProductDialogComponent } from './error-product-dialog.component';

describe('ErrorProductDialogComponent', () => {
  let component: ErrorProductDialogComponent;
  let fixture: ComponentFixture<ErrorProductDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorProductDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
