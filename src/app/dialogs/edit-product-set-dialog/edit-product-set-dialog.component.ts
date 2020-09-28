import { ProductSet } from './../../models/ProductSet';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaveProductSet } from 'src/app/models/saveProductSet';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { Product } from 'src/app/models/Product';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ProductService } from 'src/app/services/ProductService';
import { AddProductSetConfirmationComponent } from '../add-product-set-confirmation/add-product-set-confirmation.component';

@Component({
  selector: 'app-edit-product-set-dialog',
  templateUrl: './edit-product-set-dialog.component.html',
  styleUrls: ['./edit-product-set-dialog.component.scss']
})
export class EditProductSetDialogComponent implements OnInit {
  selected: number = null;
  qty = null;
  qtyError = false;
  productForm: FormGroup;
  saveProductSet: SaveProductSet;
  saveProducts: SaveProductComponent[] = [];
  viewSelectd: { productId: number, productName: String, quantity: number }[] = [];
  products: Product[] = [];
  _products : Product[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditProductSetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductSet,
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initializeProductForm();
    this.getProductData();
    this.initializeProducts();
  }
  getProductData() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      this._products = result;
    })
  }
  initializeProductForm() {
    this.productForm = new FormGroup({
      "productName": new FormControl(this.data.productName, [
        Validators.required
      ]),
      "description": new FormControl(this.data.description, [
        Validators.required
      ]),
      "price": new FormControl(this.data.price, [
      ]),
      "currency": new FormControl(this.data.currency?this.data.currency:"JPY", [
        Validators.required
      ]),
      // "quantity": new FormControl(this.data.quantity, [
      //   Validators.required
      // ]),
      // "leadTime": new FormControl(this.data.leadTime, [
      //   Validators.required
      // ]),
      // "moq": new FormControl(this.data.moq, [
      //   Validators.required
      // ]),
      "obicNo": new FormControl(this.data.obicNo, [
        Validators.required
      ]),
      "sort": new FormControl(this.data.sort,[

      ]),
      "color": new FormControl(this.data.color,[

      ]),

    });
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.productForm.valid) {
      this.saveProductSet = this.productForm.value;
      this.saveProductSet.products = this.saveProducts;
      // open confimation dialog
      const confirmDialogRef = this.dialog.open(AddProductSetConfirmationComponent, {
        width: '600px',
        data: {
          productSet: this.saveProductSet,
          productsData: this._products
        },
        disableClose: true
      });
      confirmDialogRef.afterClosed().subscribe(result => {

        switch (result) {
          case 0:
            this.onCancelClick();
            break;
          case 1:
            this.dialogRef.close(this.saveProductSet);
            break;
          default:
            break;
        }
      });
    }
  }
  getErrorMessage(attribute: string) {
    return this.productForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;

    //   default:
    //     break;
    // }
  }
  addComponent() {
    if (this.selected && this.qty) {


      const saveProductComponent: SaveProductComponent = {
        productId: this.products[this.selected].productId,
        quantity: this.qty
      }
      this.saveProducts.push(saveProductComponent);
      this.viewSelectd.push({
        productId: this.products[this.selected].productId,
        productName: this.products[this.selected].productName,
        quantity: this.qty
      })

      this.qtyError = false;
      this.selected = null;
      this.qty = null;
    } else {
      this.qtyError = true;
    }
  }

  removeComponent(id: number) {
    this.viewSelectd.splice(id, 1);
    this.saveProducts.splice(id, 1);
  }

  initializeProducts() {
    for (let product of this.data.products) {
      const saveProductComponent: SaveProductComponent = {
        productId: product.product.productId,
        quantity: product.quantity
      }
      this.saveProducts.push(saveProductComponent);
      this.viewSelectd.push({
        productId: product.product.productId,
        productName: product.product.productName,
        quantity: product.quantity
      });
    }
  }

  onKey(value) {
    this.products = this.search(value);
  }
  search(value: string) {
    let filter = value.toLowerCase();
    this.products = this._products;
    return this.products.filter(option => option.productName.toLowerCase().includes(filter));
  }
}
