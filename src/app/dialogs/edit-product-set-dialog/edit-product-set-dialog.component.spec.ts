import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductSetDialogComponent } from './edit-product-set-dialog.component';

describe('EditProductSetDialogComponent', () => {
  let component: EditProductSetDialogComponent;
  let fixture: ComponentFixture<EditProductSetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductSetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductSetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
