import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-undo-confimation-dialog',
  templateUrl: './undo-confimation-dialog.component.html',
  styleUrls: ['./undo-confimation-dialog.component.scss']
})
export class UndoConfimationDialogComponent implements OnInit {
  type;
  constructor(
    public dialogRef: MatDialogRef<UndoConfimationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit() {
    this.type = this.data;
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
