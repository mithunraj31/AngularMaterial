import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incoming-info',
  templateUrl: './incoming-info.component.html',
  styleUrls: ['./incoming-info.component.scss']
})
export class IncomingInfoComponent implements OnInit {


  data;
  url;
  constructor(
    public dialogRef: MatDialogRef<IncomingInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public input: any,
    private router: Router,
  ) { }

  ngOnInit() {
    this.data = this.input[0];
    this.url = this.input[1];
  }

  onOkClick() {
    console.log(this.url);
    this.router.navigate([this.url.base], { queryParams: { year: this.url.year, month: this.url.month } })
    this.dialogRef.close();
  }

  getColor(order) {
    if (order.fulfilled) {
      return 'normal';
    } else if (order.fixed) {
      return 'blue';
    } else {
      return 'red';
    }
  }
}
