import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UndoConfimationDialogComponent } from './undo-confimation-dialog.component';

describe('UndoConfimationDialogComponent', () => {
  let component: UndoConfimationDialogComponent;
  let fixture: ComponentFixture<UndoConfimationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UndoConfimationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UndoConfimationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
