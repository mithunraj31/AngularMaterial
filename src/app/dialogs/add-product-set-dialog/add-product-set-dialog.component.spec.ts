import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductSetDialogComponent } from './add-product-set-dialog.component';

describe('AddProductSetDialogComponent', () => {
  let component: AddProductSetDialogComponent;
  let fixture: ComponentFixture<AddProductSetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductSetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductSetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
