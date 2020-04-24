import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-incoming-info',
  templateUrl: './incoming-info.component.html',
  styleUrls: ['./incoming-info.component.scss']
})
export class IncomingInfoComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<IncomingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data)
  }

  onOkClick() {
    this.dialogRef.close();
  }
  getColor(order) {
    if (order.fulfilled) {
      return 'fulfilled';
    } else if (order.fixed) {
      return 'normal';
    } else {
      return 'fixed';
    }
  }
}
