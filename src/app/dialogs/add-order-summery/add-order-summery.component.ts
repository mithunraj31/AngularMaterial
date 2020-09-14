import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/ProductService';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Widget } from 'src/app/models/Widget';

@Component({
  selector: 'app-add-order-summery',
  templateUrl: './add-order-summery.component.html',
  styleUrls: ['./add-order-summery.component.scss']
})
export class AddOrderSummeryComponent implements OnInit {
  selected: Product []= [];
  productSearch = "";
  products: Product[] = [];
  _products: Product[] = [];
  summeryForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddOrderSummeryComponent>,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getProductData();
    this.initializeSummeryForm();
  }
  getProductData() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      this._products = result;
    });
  }
  initializeSummeryForm() {
    this.summeryForm = new FormGroup({
      "title": new FormControl("", [
        Validators.required
      ]),
      "product": new FormControl("", [
        Validators.required
      ])

    })


  }
  onKey(value) {
    this.products = this.search(value);
  }
  search(value: string) {
    let filter = value.toLowerCase();
    this.products = this._products;
    return this.products.filter(option => option.productName.toLowerCase().startsWith(filter));
  }
  resetP() {
    this.productSearch = "";
    this.selected = this.products;
  }
  onSubmit(){
    let w:Widget = {
      title: this.summeryForm.value.title,
      type: 0,
      data : {
        productId:this.summeryForm.value.product
      }
    }
    const widgets:Widget[] = JSON.parse(localStorage.getItem("widgets"));
    if(widgets!=null && widgets.length>0) {
      widgets.push(w);
      localStorage.setItem("widgets",JSON.stringify(widgets));
    } else {
      localStorage.setItem("widgets",JSON.stringify([w]));
    }
    this.dialogRef.close(true);
  }

  onCancelClick(){
    this.dialogRef.close(false);
  }
}
