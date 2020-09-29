import { IncomingShipment } from './../../models/IncomingShipment';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { SaveIncomingShipment } from 'src/app/models/SaveIncomingShipment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { ProductService } from 'src/app/services/ProductService';
import { AddIncomingShipmentConfirmationComponent } from '../add-incoming-shipment-confirmation/add-incoming-shipment-confirmation.component';
import { EditIncomingShipment } from 'src/app/models/EditIncomingShipment';

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
    @Inject(MAT_DIALOG_DATA) public data: EditIncomingShipment,
    private productService: ProductService,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
    this.initializeShipmentForm();
    this.getProductData();

  }
  initializeShipmentForm() {
    const oDate = this.data.element.orderDate.substring(0, 10);
    const dDate = this.data.element.desiredDeliveryDate.substring(0, 10);
    this.incomingShipmentForm = new FormGroup({
      "shipmentNo": new FormControl(this.data.element
        .shipmentNo, [
          Validators.required
        ]),
      "vendor": new FormControl(this.data.element.vendor, [

      ]),
      "orderDate": new FormControl(oDate, [
        Validators.required
      ]),
      "desiredDeliveryDate": new FormControl(dDate, [
        Validators.required
      ]),
      "productId": new FormControl(this.data.element.product.productId, [
        Validators.required
      ]),
      "quantity": new FormControl(this.data.element.quantity, [
        Validators.required
      ]),


    });
    this.incomingShipmentForm.get("shipmentNo").disable();
    if(!this.data.editable) {
    this.incomingShipmentForm.get("productId").disable();
    }
    if(this.data.element.partial) {
      this.incomingShipmentForm.get("orderDate").disable();
    }

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
      this.saveIncomingShipment.shipmentNo = this.data.element.shipmentNo;
      this.saveIncomingShipment.productId = this.data.element.product.productId;

      this.saveIncomingShipment.desiredDeliveryDate = new Date(this.incomingShipmentForm.value.desiredDeliveryDate).toISOString();
      this.saveIncomingShipment.incomingShipmentId = this.data.element.incomingShipmentId;
      this.saveIncomingShipment.branch = this.data.element.branch;
      if (this.data.element.partial){
        this.saveIncomingShipment.orderDate = new Date(this.data.element.orderDate).toISOString();
      }else {
        this.saveIncomingShipment.orderDate = new Date(this.incomingShipmentForm.value.orderDate).toISOString();
      }
      if (!this.data.element.fixed) {
        this.saveIncomingShipment.pendingQty = this.data.element.pendingQty + (this.saveIncomingShipment.quantity - this.data.element.quantity);
      } else {
        this.saveIncomingShipment.fixedDeliveryDate = new Date(this.data.element.fixedDeliveryDate).toISOString();
        this.saveIncomingShipment.confirmedQty = this.data.element.confirmedQty;
      }
      this.saveIncomingShipment.fixed = this.data.element.fixed;
      this.saveIncomingShipment.partial = this.data.element.partial;
      this.saveIncomingShipment.arrived = this.data.element.arrived;

      // open confimation dialog
      const confirmDialogRef = this.dialog.open(AddIncomingShipmentConfirmationComponent, {
        width: '600px',
        data: {
          order: this.saveIncomingShipment,
          products: this._products
        },
        disableClose: true
      });
      confirmDialogRef.afterClosed().subscribe(result => {

        switch (result) {
          case 0:
            this.onCancelClick();
            break;
          case 1:
            this.dialogRef.close(this.saveIncomingShipment);
            break;
          default:
            break;
        }
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
}
