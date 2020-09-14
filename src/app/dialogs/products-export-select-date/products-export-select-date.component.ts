import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-products-export-select-date',
  templateUrl: './products-export-select-date.component.html',
  styleUrls: ['./products-export-select-date.component.scss']
})
export class ProductsExportSelectDateComponent implements OnInit {
  date;
  dateError;
  constructor(public dialogRef: MatDialogRef<ProductsExportSelectDateComponent>) { }

  ngOnInit() {
    this.date = new Date().toISOString().substring(0, 10);
  }

  submit(){
    this.dialogRef.close(new Date(this.date));
  }
  onCancelClick(){
    this.dialogRef.close(null);
  }

}
