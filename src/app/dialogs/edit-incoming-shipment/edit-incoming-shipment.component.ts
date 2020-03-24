import { IncomingShipment } from './../../models/IncomingShipment';
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
  products: Product[] = [];
  _products: Product[] = [];
  saveIncomingShipment: SaveIncomingShipment;
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncomingShipment,
    private productService: ProductService
  ) { }


  ngOnInit() {
    this.initializeShipmentForm();
    this.getProductData();

  }
  initializeShipmentForm() {
    const oDate = new Date(this.data.orderDate).toISOString().substring(0, 10);
    const dDate = new Date(this.data.desiredDeliveryDate).toISOString().substring(0, 10);
    this.incomingShipmentForm = new FormGroup({
      "shipmentNo": new FormControl(this.data
        .shipmentNo, [
        Validators.required
      ]),
      "branch": new FormControl(this.data.branch, [

      ]),
      "vendor": new FormControl(this.data.vendor, [

      ]),
      "orderDate": new FormControl(oDate, [
        Validators.required
      ]),
      "desiredDeliveryDate": new FormControl(dDate, [
        Validators.required
      ]),
      "productId": new FormControl(this.data.product.productId, [
        Validators.required
      ]),
      "quantity": new FormControl(this.data.quantity, [
        Validators.required
      ]),

      
    })
   

  }
  getProductData() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
      this._products = result;
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(false);
  }
  onSubmit() {
    if (this.incomingShipmentForm.valid) {
      this.saveIncomingShipment = this.incomingShipmentForm.value;
      this.saveIncomingShipment.orderDate = new Date(this.incomingShipmentForm.value.orderDate).toISOString();
      this.saveIncomingShipment.desiredDeliveryDate = new Date(this.incomingShipmentForm.value.desiredDeliveryDate).toISOString();
      this.saveIncomingShipment.incomingShipmentId = this.data.incomingShipmentId;
      this.dialogRef.close(this.saveIncomingShipment);
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
}
