import { SaveShipmentProduct } from './../../models/SaveShipmentProduct';
import { SaveIncomingShipment } from './../../models/SaveIncomingShipment';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/ProductService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddIncomingShipmentConfirmationComponent } from '../add-incoming-shipment-confirmation/add-incoming-shipment-confirmation.component';

@Component({
  selector: 'app-add-incoming-shipment',
  templateUrl: './add-incoming-shipment.component.html',
  styleUrls: ['./add-incoming-shipment.component.scss']
})
export class AddIncomingShipmentComponent implements OnInit, OnDestroy {
  incomingShipmentForm: FormGroup;
  selected: number = null;
  qty = null;
  qtyError = false;
  alreadyExistsError = false;
  price = null;
  currency = "JPY";
  priceError = false;
  viewSelectd: { productId: number, productName: String, quantity: number, price: number, currency: string }[] = [];
  products: Product[] = [];
  _products: Product[] = [];
  saveIncomingShipment: SaveIncomingShipment;
  saveShipmentProducts: SaveShipmentProduct[] = [];
  unsub = new Subject();
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    public dialog: MatDialog,
  ) { }


  ngOnInit() {
    this.initializeShipmentForm();
    this.getProductData();
  }
  ngOnDestroy(){
    this.unsub.next();
    this.unsub.complete();
  }
  initializeShipmentForm() {
    this.incomingShipmentForm = new FormGroup({
      "shipmentNo": new FormControl("", [
        Validators.required
      ]),
      "branch": new FormControl("", [

      ]),
      "vendor": new FormControl("", [

      ]),
      "orderDate": new FormControl("", [
        Validators.required
      ]),
      "desiredDeliveryDate": new FormControl("", [
        Validators.required
      ]),
      "productId": new FormControl("", [
        Validators.required
      ]),
      "quantity": new FormControl("", [
        Validators.required
      ]),

      
    })
  }
  getProductData() {
    this.productService.getProducts().pipe(takeUntil(this.unsub)).subscribe(result => {
      this.products = result;
      this._products = result;
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.incomingShipmentForm.valid) {
      this.saveIncomingShipment = this.incomingShipmentForm.value;
      this.saveIncomingShipment.orderDate = new Date(this.incomingShipmentForm.value.orderDate).toISOString();
      this.saveIncomingShipment.desiredDeliveryDate = new Date(this.incomingShipmentForm.value.desiredDeliveryDate).toISOString();
      this.saveIncomingShipment.pendingQty = this.saveIncomingShipment.quantity;
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
        // console.log('The dialog was closed');
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
