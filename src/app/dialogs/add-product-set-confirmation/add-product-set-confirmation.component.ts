import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SaveProductSet } from './../../models/saveProductSet';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-add-product-set-confirmation',
  templateUrl: './add-product-set-confirmation.component.html',
  styleUrls: ['./add-product-set-confirmation.component.scss']
})
export class AddProductSetConfirmationComponent implements OnInit {
  products: Product[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetConfimationData,
    public dialogRef: MatDialogRef<AddProductSetConfirmationComponent>,
  ) { }

  ngOnInit() {
    this.populateProducts();
    // console.log(this.data);
    // console.log(this.products);
  }
  onCancelClick() {
    this.dialogRef.close(0);
  }
  onOkClick() {
    this.dialogRef.close(1);
  }
  onReturnClick() {
    this.dialogRef.close(2);
  }

  populateProducts() {
    this.data.productSet.products.forEach(product => {
      let p: Product;
      const found = this.data.productsData.filter(pr => pr.productId === product.productId);
      p = found[0];
      p.quantity = product.quantity;
      this.products.push(p);
    });
    // console.log(this.products);
  }

}

interface ProductSetConfimationData {
  productSet: SaveProductSet;
  productsData: Product[];

}
