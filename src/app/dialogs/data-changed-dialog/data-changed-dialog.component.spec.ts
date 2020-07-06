import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataChangedDialogComponent } from './data-changed-dialog.component';

describe('DataChangedDialogComponent', () => {
  let component: DataChangedDialogComponent;
  let fixture: ComponentFixture<DataChangedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataChangedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataChangedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
