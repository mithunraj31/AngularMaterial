import { User } from './../../models/User';
import { Component, OnInit, Inject } from '@angular/core';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditOrderDialogComponent } from '../edit-order-dialog/edit-order-dialog.component';
import { Order } from 'src/app/models/Order';
import { CustomerService } from 'src/app/services/CustomerService';
import { ProductService } from 'src/app/services/ProductService';
import { UserService } from 'src/app/services/UserService';
import { SaveOrder } from 'src/app/models/SaveOrder';
import { ProductSet } from 'src/app/models/ProductSet';

@Component({
  selector: 'app-transfer-to-confirmed-order',
  templateUrl: './transfer-to-confirmed-order.component.html',
  styleUrls: ['./transfer-to-confirmed-order.component.scss']
})
export class TransferToConfirmedOrderComponent implements OnInit {

  viewSelectd: { productId: number, productName: String, quantity: number }[] = [];
  saveProducts: SaveProductComponent[] = [];
  orderForm: FormGroup;
  customers: Customer[] = [];
  salesD: Customer[] = [];
  contractors: Customer[] = [];
  _customers: Customer[] = [];
  users: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private customerService: CustomerService,
    private productService: ProductService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCustomerData();
    this.getUserData();
    this.initializeCustomerForm();
  }
  getCustomerData() {
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result;
      this._customers = result;
      this.contractors = result;
      this.salesD = result;

    })
  }
  getUserData() {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
    })
  }

  initializeCustomerForm() {

    const rDate = this.data.receivedDate ? this.data.receivedDate.substring(0, 10) : "";
    const dDate = this.data.dueDate ? this.data.dueDate.substring(0, 10) : "";
    const delDate = this.data.deliveryDate ? this.data.deliveryDate.substring(0, 10) : "";

    this.orderForm = new FormGroup({
      "proposalNo": new FormControl(this.data.proposalNo, [
        Validators.required
      ]),
      "customerId": new FormControl(this.data.customer.customerId ? this.data.customer.customerId : "", [
        Validators.required
      ]),
      "salesDestinationId": new FormControl(this.data.salesDestination ? this.data.salesDestination.customerId : "", [

      ]),
      "contractorId": new FormControl(this.data.contractor ? this.data.contractor.customerId : "", [
      ]),
      "receivedDate": new FormControl(rDate, [
        this.data.fixed ? Validators.required : Validators.nullValidator
      ]),
      "dueDate": new FormControl(dDate, [
        Validators.required
      ]),
      "deliveryDate": new FormControl(delDate, [
        Validators.required
      ]),
      "salesUserId": new FormControl(this.data.salesUser.userId, [
        Validators.required
      ]),

    });

    for (let product of this.data.orderedProducts) {
      this.viewSelectd.push({
        productId: product.product.productId,
        productName: product.product.productName,
        quantity: product.quantity
      });
      this.saveProducts.push({
        productId: product.product.productId,
        quantity: product.quantity
      });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.orderForm.valid) {
      const order: SaveOrder = this.orderForm.value;
      order.orderedProducts = this.saveProducts;

      order.receivedDate = order.receivedDate?new Date(this.orderForm.value.receivedDate).toISOString():null;
      order.dueDate = new Date(this.orderForm.value.dueDate).toISOString();
      order.deliveryDate = new Date(this.orderForm.value.deliveryDate).toISOString();
      order.orderId = this.data.orderId;
      this.dialogRef.close(order);
    }
  }

  onKey(value, key) {
    switch (key) {

      case 'customers':
        this.customers = this.searchCustomers(value);
        break;
      case 'salesD':
        this.salesD = this.searchSalesD(value);
        break;
      case 'contractors':
        this.contractors = this.searchContractors(value);
        break;

      default:
        break;
    }
  }
  onClick(key) {
    switch (key) {
      case 'customers':
        this.customers = this._customers;
        break;

      default:
        break;
    }
  }
  searchCustomers(value: string) {
    let filter = value.toLowerCase();
    this.customers = this._customers;
    return this.customers.filter(option => option.customerName.toLowerCase().includes(filter));
  }
  searchContractors(value: string) {
    let filter = value.toLowerCase();
    this.contractors = this._customers;
    return this.contractors.filter(option => option.customerName.toLowerCase().includes(filter));
  }
  searchSalesD(value: string) {
    let filter = value.toLowerCase();
    this.salesD = this._customers;
    return this.salesD.filter(option => option.customerName.toLowerCase().includes(filter));
  }
  calculateDelivery(value) {
    if (value) {
    }
  }

  isItType(customer: string[], type: string) {
    return customer.includes(type);
  }

}
