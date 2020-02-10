import { ProductService } from './../../services/ProductService';
import { Product } from 'src/app/models/Product';
import { SaveProductComponent } from './../../models/saveProductComponent';
import { SaveProductSet } from './../../models/saveProductSet';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product-set-dialog',
  templateUrl: './add-product-set-dialog.component.html',
  styleUrls: ['./add-product-set-dialog.component.scss']
})
export class AddProductSetDialogComponent implements OnInit {
  selected: number=null;
  qty=null;
  qtyError=false;
  productForm: FormGroup;
  saveProductSet: SaveProductSet;
  saveProducts: SaveProductComponent[]= [];
  viewSelectd: {productId: number,productName: String,quantity: number}[] = [];
  products: Product[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) { }

  
  ngOnInit() {
    this.initializeProductForm();
    this.getProductData();
    
  }
  getProductData() {
    this.productService.getProducts().subscribe(result=>{
      this.products = result;
    })
  }
  initializeProductForm() {
    this.productForm = new FormGroup({
      "productName": new FormControl("",[
        Validators.required
      ]),
      "description": new FormControl("",[
        Validators.required
      ]),
      "price": new FormControl("",[
        Validators.required
      ]),
      "currency": new FormControl("JPY",[
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
      "obicNo": new FormControl("",[
        Validators.required
      ]),

    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit(){
    if(this.productForm.valid){
      this.saveProductSet = this.productForm.value;
      this.saveProductSet.products = this.saveProducts;
      this.dialogRef.close(this.saveProductSet);
    }
  }
  getErrorMessage(attribute:string) {
    return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;
    
    //   default:
    //     break;
    // }
  }
  addComponent(){
    if(this.selected && this.qty){
      console.log(this.selected);
      
      const saveProductComponent: SaveProductComponent = {
        productId : this.products[this.selected].productId,
        quantity : this.qty
      }
      this.saveProducts.push(saveProductComponent);
      this.viewSelectd.push({
        productId: this.products[this.selected].productId,
        productName: this.products[this.selected].productName,
        quantity: this.qty
      })
      console.log(this.viewSelectd);
      this.qtyError = false;
      this.selected=null;
      this.qty = null;
    } else {
      this.qtyError = true;
    }
  }

  removeComponent(id: number){
    this.viewSelectd.splice(id,1);
    this.saveProducts.splice(id,1);
  }


}
