import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {

  data;
  url;
  constructor(
    public dialogRef: MatDialogRef<OrderInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public input: any,
    private router:Router,
  ) { }

  ngOnInit() {
    this.data = this.input[0];
    this.url = this.input[1];
  }

  onOkClick() {
    console.log(this.url);
    this.router.navigate([this.url.base],{ queryParams: { year: this.url.year, month: this.url.month } })
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
