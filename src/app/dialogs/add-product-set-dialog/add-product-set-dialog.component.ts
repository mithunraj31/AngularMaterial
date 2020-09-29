import { ProductService } from './../../services/ProductService';
import { Product } from 'src/app/models/Product';
import { SaveProductComponent } from './../../models/saveProductComponent';
import { SaveProductSet } from './../../models/saveProductSet';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddProductSetConfirmationComponent } from '../add-product-set-confirmation/add-product-set-confirmation.component';
import { ErrorProductDialogComponent } from '../error-product-dialog/error-product-dialog.component';

@Component({
  selector: 'app-add-product-set-dialog',
  templateUrl: './add-product-set-dialog.component.html',
  styleUrls: ['./add-product-set-dialog.component.scss']
})
export class AddProductSetDialogComponent implements OnInit {
  selected: number = null;
  progress = false;
  qty = null;
  qtyError = false;
  productForm: FormGroup;
  saveProductSet: SaveProductSet;
  saveProducts: SaveProductComponent[] = [];
  viewSelectd: { productId: number, productName: String, quantity: number }[] = [];
  products: Product[] = [];
  _products: Product[] = [];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) { }


  ngOnInit() {
    this.initializeProductForm();
    this.getProductData();

  }
  getProductData() {
    this.productService.getProducts().subscribe(result => {
      this._products = result;
      this.products = result;
    })
  }
  initializeProductForm() {
    this.productForm = new FormGroup({
      "productName": new FormControl("", [
        Validators.required
      ]),
      "description": new FormControl("", [
        Validators.required
      ]),
      "price": new FormControl("", [

      ]),
      "currency": new FormControl("JPY", [
        Validators.required
      ]),
      // "quantity": new FormControl("",[
      //   Validators.required
      // ]),
      // "leadTime": new FormControl("",[
      //   Validators.required
      // ]),
      // "moq": new FormControl("",[
      //   Validators.required
      // ]),
      "obicNo": new FormControl("", [
        Validators.required
      ]),
      "sort": new FormControl(this.data.length+1, [

      ]),
      "color": new FormControl("", [

      ]),
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.productForm.valid) {
      if(this.isObicNoDuplicated(this.productForm.controls['obicNo'].value)){
        const dialogRef = this.dialog.open(ErrorProductDialogComponent, {
          width: '600px',
          data: this.productForm.controls['obicNo'].value
        });
      }else{
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
            this.checkObicNoDuplicationInApi(this.saveProductSet);
            break;
          default:
            break;
        }
      });
    }
    }
  }

  checkObicNoDuplicationInApi(result){
    if(result){
      const product: Product = result;
        // API Requst to save product
        this.progress = true;
        this.productService.addProductSet(result).subscribe(result => {
        this.dialogRef.close(true);
    }, (ex) => {
      this.progress = false;
      if(ex.error.message=="ObicNo Already Present"){
        const dialogRef = this.dialog.open(ErrorProductDialogComponent, {
          width: '600px',
          data: result.obicNo
        });
      }
    })
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
      });

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

  onKey(value) {
    this.products = this.search(value);
  }
  search(value: string) {
    let filter = value.toLowerCase();
    this.products = this._products;
    return this.products.filter(option => option.productName.toLowerCase().startsWith(filter));
  }

  isObicNoDuplicated(obicNo:string){
    if(this.data.some(code=>code.obicNo==obicNo)){
      return true;
    }else{
      return false;
    }
  }
}
