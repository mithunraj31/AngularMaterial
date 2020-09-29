import { ProductSet } from './../../models/ProductSet';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaveProductSet } from 'src/app/models/saveProductSet';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { Product } from 'src/app/models/Product';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ProductService } from 'src/app/services/ProductService';
import { AddProductSetConfirmationComponent } from '../add-product-set-confirmation/add-product-set-confirmation.component';
import { ErrorProductDialogComponent } from '../error-product-dialog/error-product-dialog.component';
import { DataChangedDialogComponent } from '../data-changed-dialog/data-changed-dialog.component';

@Component({
  selector: 'app-edit-product-set-dialog',
  templateUrl: './edit-product-set-dialog.component.html',
  styleUrls: ['./edit-product-set-dialog.component.scss']
})
export class EditProductSetDialogComponent implements OnInit {
  selected: number = null;
  progress = false;
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
    @Inject(MAT_DIALOG_DATA) public data:  {
      allproductset:ProductSet[]
      editableProduct:ProductSet
      loadTime: Date;
    },
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
      "productName": new FormControl(this.data.editableProduct.productName, [
        Validators.required
      ]),
      "description": new FormControl(this.data.editableProduct.description, [
        Validators.required
      ]),
      "price": new FormControl(this.data.editableProduct.price, [
      ]),
      "currency": new FormControl(this.data.editableProduct.currency?this.data.editableProduct.currency:"JPY", [
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
      "obicNo": new FormControl(this.data.editableProduct.obicNo, [
        Validators.required
      ]),
      "sort": new FormControl(this.data.editableProduct.sort,[

      ]),
      "color": new FormControl(this.data.editableProduct.color,[

      ]),

    });
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

 async checkObicNoDuplicationInApi(result){
    if (result) {
      let isChanged = await this.isDataChanged(this.data.editableProduct.productId);
      if (isChanged.status) { // when data is changed
        //Load Warning popup
        const dialogRef = this.dialog.open(DataChangedDialogComponent, {
          width: '600px',
          data: isChanged
        });

        dialogRef.afterClosed().subscribe(result => {


        });
      } else { // When data is not changed.
        this.progress = true;
        const productset: SaveProductSet = result;
        productset.productId = this.data.editableProduct.productId;
        productset.display = this.data.editableProduct.display;
        this.productService.editProductSet(productset).subscribe(result => {
          this.dialogRef.close(true);
        }, ex => {
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
  }

  isDataChanged(orderId: number) {
    let lastEditedTime: Date;
    return new Promise<any>((resolve, reject) => {
      this.productService.getProductSetById(orderId).subscribe(result => {
        lastEditedTime = new Date(result.updatedAt);
        console.log(result);
        if (lastEditedTime > this.data.loadTime) {

          return resolve({
            status: true, user: result.user,
            editReason: result.editReason,
            updatedAt: result.updatedAt
          });
        }
        else {

          return resolve({ status: false, user: result.user });
        }
      });
    });
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
    for (let product of this.data.editableProduct.products) {
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
    return this.products.filter(option => option.productName.toLowerCase().startsWith(filter));
  }

  isObicNoDuplicated(obicNo:string){
    if(this.data.allproductset.some(code=>code.obicNo==obicNo&&code.productId!=this.data.editableProduct.productId)){
      return true;
    }else{
      return false;
    }
  }
}
