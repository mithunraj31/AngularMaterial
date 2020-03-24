import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { SaveIncomingShipment } from 'src/app/models/SaveIncomingShipment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { IncomingShipment } from 'src/app/models/IncomingShipment';
import { ProductService } from 'src/app/services/ProductService';

@Component({
  selector: 'app-confirm-incoming-shipment',
  templateUrl: './confirm-incoming-shipment.component.html',
  styleUrls: ['./confirm-incoming-shipment.component.scss']
})
export class ConfirmIncomingShipmentComponent implements OnInit {
  incomingShipmentForm: FormGroup;
  products: Product[] = [];
  _products: Product[] = [];
  saveIncomingShipment: SaveIncomingShipment;
  partial = false;
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
    this.incomingShipmentForm = new FormGroup({
      "fixedDeliveryDate": new FormControl("", [
        Validators.required
      ]),
      "confirmedQty": new FormControl(this.data.pendingQty > 0 ? this.data.pendingQty : this.data.quantity, [
        Validators.required
      ]),
    })

    this.incomingShipmentForm.get("confirmedQty").disable();


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
      this.saveIncomingShipment = this.createSaveIn();
      // this.saveIncomingShipment.incomingShipmentId = this.data.incomingShipmentId;
      if (this.partial) {
        this.saveIncomingShipment.fixedDeliveryDate = new Date(this.incomingShipmentForm.value.fixedDeliveryDate).toISOString();
        this.saveIncomingShipment.pendingQty = 0;
        this.saveIncomingShipment.confirmedQty = this.incomingShipmentForm.value.confirmedQty;
        this.saveIncomingShipment.partial = true;
        this.saveIncomingShipment.fixed = true;
        this.saveIncomingShipment.incomingShipmentId = undefined;
        const mainOrder: SaveIncomingShipment = this.createSaveIn();
        mainOrder.pendingQty = this.data.pendingQty - this.incomingShipmentForm.value.confirmedQty;

        this.dialogRef.close([this.saveIncomingShipment, mainOrder]);
      } else {
        this.saveIncomingShipment.pendingQty = 0;
        this.saveIncomingShipment.confirmedQty = this.data.pendingQty;
        this.saveIncomingShipment.partial = false;
        this.saveIncomingShipment.fixed = true;
        this.saveIncomingShipment.fixedDeliveryDate = new Date(this.incomingShipmentForm.value.fixedDeliveryDate).toISOString();
        this.saveIncomingShipment.incomingShipmentId = this.data.incomingShipmentId;
        this.dialogRef.close([null, this.saveIncomingShipment]);
      }
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
  clickPartial() {
    if (this.partial) {
      this.incomingShipmentForm.get("confirmedQty").enable();
    } else {
      this.incomingShipmentForm.get("confirmedQty").disable();
    }
  }
  createSaveIn(): SaveIncomingShipment {
    console.log("test");
    const object: SaveIncomingShipment = {
      branch: this.data.branch,
      confirmedQty: this.data.confirmedQty,
      currency: this.data.currency,
      desiredDeliveryDate: new Date(this.data.desiredDeliveryDate).toISOString(),
      fixed: this.data.fixed,
      fixedDeliveryDate: null,
      incomingShipmentId: this.data.incomingShipmentId,
      orderDate: new Date(this.data.orderDate).toISOString(),
      partial: this.data.partial,
      pendingQty: this.data.pendingQty,
      price: this.data.price,
      productId: this.data.product.productId,
      quantity: this.data.quantity,
      vendor: this.data.vendor,
      shipmentNo: this.data.shipmentNo

    };

    return object;
  }
}
