import { Component, OnInit, Inject } from '@angular/core';
import { SaveShipmentProduct } from 'src/app/models/SaveShipmentProduct';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { SaveIncomingShipment } from 'src/app/models/SaveIncomingShipment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-edit-incoming-shipment',
  templateUrl: './edit-incoming-shipment.component.html',
  styleUrls: ['./edit-incoming-shipment.component.scss']
})
export class EditIncomingShipmentComponent implements OnInit {
  incomingShipmentForm: FormGroup;
  selected: number=null;
  qty=null;
  qtyError=false;
  price=null;
  priceError=false;
  viewSelectd: {productId: number,productName: String,quantity: number, price:number}[] = [];
  products: Product[] = [];
  saveIncomingShipment:SaveIncomingShipment;
  saveShipmentProducts: SaveShipmentProduct [] = [];
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) { }


  ngOnInit() {
   this.initializeShipmentForm();
    this.getProductData();
    
  }
  initializeShipmentForm(){
    const aDate = new Date(this.data.arrivalDate).toISOString().substring(0, 10);
    this.incomingShipmentForm = new FormGroup({
      "shipmentNo": new FormControl(this.data.shipmentNo,[
        Validators.required
      ]),
      "arrivalDate": new FormControl(aDate,[
        Validators.required
      ]),
    })
    for(let product of this.data.products) {
      const saveShipmentProduct: SaveShipmentProduct = {
        productId : product.product.productId,
        quantity : product.quantity,
        price: product.price
      }
      this.saveShipmentProducts.push(saveShipmentProduct);
      this.viewSelectd.push({
        productId: product.product.productId,
        productName: product.product.productName,
        quantity : product.quantity,
        price: product.price
      })
    }

  }
  getProductData() {
    this.productService.getProducts().subscribe(result=>{
      this.products = result;
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit(){
    if(this.incomingShipmentForm.valid){
      this.saveIncomingShipment = this.incomingShipmentForm.value;
      this.saveIncomingShipment.products = this.saveShipmentProducts;
      this.saveIncomingShipment.arrivalDate = new Date(this.incomingShipmentForm.value.arrivalDate).toISOString();
      console.log(new Date(this.incomingShipmentForm.value.arrivalDate).toISOString());
      this.dialogRef.close(this.saveIncomingShipment);
    }
  }
  getErrorMessage(attribute:string) {
    return this.incomingShipmentForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;
    
    //   default:
    //     break;
    // }
  }
  addComponent(){
    if(this.selected && this.qty && this.price){
      console.log(this.selected);
      
      const saveShipmentProduct: SaveShipmentProduct = {
        productId : this.products[this.selected].productId,
        quantity : this.qty,
        price: this.price
      }
      this.saveShipmentProducts.push(saveShipmentProduct);
      this.viewSelectd.push({
        productId: this.products[this.selected].productId,
        productName: this.products[this.selected].productName,
        quantity: this.qty,
        price: this.price
      })
      console.log(this.viewSelectd);
      this.qtyError = false;
      this.selected=null;
      this.qty = null;
      this.price = null;
      this.priceError =false;
    } else if(!this.qty){
      this.qtyError = true;
    } else if(!this.price){
      this.priceError =true;
    }
  }
  removeComponent(id: number){
    this.viewSelectd.splice(id,1);
    this.saveShipmentProducts.splice(id,1);
  }
}
