import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-unfulfilled-products',
  templateUrl: './unfulfilled-products.component.html',
  styleUrls: ['./unfulfilled-products.component.scss']
})
export class UnfulfilledProductsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UnfulfilledProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    console.log(this.data);
  }

}
