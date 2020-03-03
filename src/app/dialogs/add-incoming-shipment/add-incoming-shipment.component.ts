import { SaveShipmentProduct } from './../../models/SaveShipmentProduct';
import { SaveIncomingShipment } from './../../models/SaveIncomingShipment';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddProductDialogComponent } from '../add-product-dialog/add-product-dialog.component';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/ProductService';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  saveIncomingShipment: SaveIncomingShipment;
  saveShipmentProducts: SaveShipmentProduct[] = [];
  unsub = new Subject();
  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
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
      "arrivalDate": new FormControl("", [
        Validators.required
      ]),
    })
  }
  getProductData() {
    this.productService.getProducts().pipe(takeUntil(this.unsub)).subscribe(result => {
      this.products = result;
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.incomingShipmentForm.valid) {
      this.saveIncomingShipment = this.incomingShipmentForm.value;
      this.saveIncomingShipment.products = this.saveShipmentProducts;
      this.saveIncomingShipment.arrivalDate = new Date(this.incomingShipmentForm.value.arrivalDate).toISOString();
      console.log(new Date(this.incomingShipmentForm.value.arrivalDate).toISOString());
      this.dialogRef.close(this.saveIncomingShipment);
    }
  }
  getErrorMessage(attribute: string) {
    return this.incomingShipmentForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;

    //   default:
    //     break;
    // }
  }
  addComponent() {
    if (this.selected && this.qty && this.price) {
      console.log(this.selected);

      const saveShipmentProduct: SaveShipmentProduct = {
        productId: this.products[this.selected].productId,
        quantity: this.qty,
        price: this.price,
        currency: this.currency
      }

      //check the product is already exists
      this.alreadyExistsError= false;
      this.saveShipmentProducts.forEach(product => {
        if (product.productId == saveShipmentProduct.productId)
          this.alreadyExistsError = true;
      })
      if (!this.alreadyExistsError) {
        this.saveShipmentProducts.push(saveShipmentProduct);
        this.viewSelectd.push({
          productId: this.products[this.selected].productId,
          productName: this.products[this.selected].productName,
          quantity: this.qty,
          price: this.price,
          currency: this.currency
        })
        console.log(this.viewSelectd);
        this.qtyError = false;
        this.selected = null;
        this.qty = null;
        this.price = null;
        this.priceError = false;
        this.alreadyExistsError= false;
      }
    } else if (!this.qty) {
      this.qtyError = true;
    } else if (!this.price) {
      this.priceError = true;
    }
  }
  removeComponent(id: number) {
    this.viewSelectd.splice(id, 1);
    this.saveShipmentProducts.splice(id, 1);
  }
}
