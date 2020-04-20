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
  viewSelectd: { productId: number, productName: string, quantity: number }[] = [];
  alreadyExistsError = false;
  products: Product[] = [];
  _products: Product[] = [];
  saveIncomingShipment: SaveIncomingShipment;
  saveShipmentProducts: SaveShipmentProduct[] = [];
  unsub = new Subject();
  emptyProducts = false;
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
  ngOnDestroy() {
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
    this.emptyProducts = false;
    if (this.viewSelectd.length === 0) {
      this.emptyProducts = true;
    }
    if (this.incomingShipmentForm.valid && this.viewSelectd.length > 0) {
      this.saveIncomingShipment = this.incomingShipmentForm.value;
      this.saveIncomingShipment.orderDate = new Date(this.incomingShipmentForm.value.orderDate).toISOString();
      this.saveIncomingShipment.desiredDeliveryDate = new Date(this.incomingShipmentForm.value.desiredDeliveryDate).toISOString();
      // open confimation dialog
      const confirmDialogRef = this.dialog.open(AddIncomingShipmentConfirmationComponent, {
        width: '600px',
        data: {
          order: this.saveIncomingShipment,
          products: this._products,
          selected: this.viewSelectd
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
            const shipments: SaveIncomingShipment[] = [];
            for (let c = 0; c < this.viewSelectd.length; c++) {
              const shipment: SaveIncomingShipment = {
                branch: this.saveIncomingShipment.branch,
                desiredDeliveryDate: this.saveIncomingShipment.desiredDeliveryDate,
                orderDate: this.saveIncomingShipment.orderDate,
                pendingQty: this.viewSelectd[c].quantity,
                productId: this.viewSelectd[c].productId,
                quantity: this.viewSelectd[c].quantity,
                shipmentNo: this.saveIncomingShipment.shipmentNo,
                vendor: this.saveIncomingShipment.vendor,
              }
              shipment.productId = this.viewSelectd[c].productId;
              shipment.quantity = this.viewSelectd[c].quantity;
              shipment.pendingQty = this.viewSelectd[c].quantity;
              shipments.push(shipment);
            }
            // console.log(shipments);
            this.dialogRef.close(shipments);
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
  onClick() {
    this.products = this._products;
  }
  addComponent() {
    if (this.selected && this.qty) {
      // console.log(this.selected);
      this.viewSelectd.push({
        productId: this.products[this.selected].productId,
        productName: this.products[this.selected].productName,
        quantity: this.qty
      });
      // console.log(this.viewSelectd);
      this.qtyError = false;
      this.selected = null;
      this.qty = null;
    } else {
      this.qtyError = true;
    }
  }
  removeComponent(id: number) {
    this.viewSelectd.splice(id, 1);
  }
}
