import { User } from './../../models/User';
import { SaveOrder } from './../../models/SaveOrder';
import { Order } from './../../models/Order';
import { Component, OnInit, Inject } from '@angular/core';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { Product } from 'src/app/models/Product';
import { ProductSet } from 'src/app/models/ProductSet';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomerService } from 'src/app/services/CustomerService';
import { ProductService } from 'src/app/services/ProductService';
import { UserService } from 'src/app/services/UserService';
import { AddOrderConfirmationComponent } from '../add-order-confirmation/add-order-confirmation.component';

@Component({
  selector: 'app-edit-order-dialog',
  templateUrl: './edit-order-dialog.component.html',
  styleUrls: ['./edit-order-dialog.component.scss']
})
export class EditOrderDialogComponent implements OnInit {

  selected: number = null;
  qty = null;
  qtyError = false;
  viewSelectd: { productId: number, productName: String, quantity: number }[] = [];
  saveProducts: SaveProductComponent[] = [];
  orderForm: FormGroup;
  customers: Customer[] = [];
  salesD: Customer[] = [];
  contractors: Customer[] = [];
  _customers: Customer[] = [];
  products: Product[] = [];
  productSets: ProductSet[] = [];
  _productSets: ProductSet[] = [];
  users: User[] = [];
  _users: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private customerService: CustomerService,
    private productService: ProductService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCustomerData();
    this.initializeCustomerForm();
    this.getProductData();
    this.getUserData();
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
      this._users = result;
    })
  }

  initializeCustomerForm() {

    (this.data);
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

      "editReason": new FormControl("", [

      ]),

    });
    //this.orderForm.controls['customer'].setValue(this.data.customer.customerId,{onlySelf: true})
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
    console.log(this.orderForm.value);
    if (this.orderForm.valid) {
      const order: SaveOrder = this.orderForm.value;
      order.orderedProducts = this.saveProducts;
      order.receivedDate = order.receivedDate ? new Date(this.orderForm.value.receivedDate).toISOString() : null;
      order.dueDate = new Date(this.orderForm.value.dueDate).toISOString();
      order.deliveryDate = new Date(this.orderForm.value.deliveryDate).toISOString();
      // open confimation dialog
      const confirmDialogRef = this.dialog.open(AddOrderConfirmationComponent, {
        width: '600px',
        data: {
          order: order,
          products: this._productSets,
          customers: this._customers,
          users: this._users
        },
        disableClose: true
      });
      confirmDialogRef.afterClosed().subscribe(result => {

        switch (result) {
          case 0:
            this.onCancelClick();
            break;
          case 1:
            this.dialogRef.close(order);
            break;
          default:
            break;
        }
      });
    }
  }
  getErrorMessage(attribute: string) {
    return this.orderForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
    // switch (attribute) {
    //   case "zip":
    //       // return this.customerForm.get(attribute).hasError('required') ? 'You must enter a value':
    //       // this.customerForm.get(attribute).hasError('maxlength') ? 'zip code length must be 7':
    //       // this.customerForm.get(attribute).hasError('minlength') ? 'zip code length must be 7': '';
    //     break;

    //   default:
    //       return this.orderForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;
    // }
  }
  addComponent() {
    if (this.selected && this.qty) {


      const saveProductComponent: SaveProductComponent = {
        productId: this.productSets[this.selected].productId,
        quantity: this.qty
      }
      this.saveProducts.push(saveProductComponent);
      this.viewSelectd.push({
        productId: this.productSets[this.selected].productId,
        productName: this.productSets[this.selected].productName,
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
  getProductData() {
    this.productService.getProductSets().subscribe(result => {
      this.productSets = result;
      this.productService.getProducts().subscribe(presult => {
        for (let product of presult) {
          const p: ProductSet = {

            active: product.active,
            productId: product.productId,
            price: product.price,
            productName: product.productName,
            createdAt: product.createdAt,
            description: product.description,
            isSet: product.isSet,
            leadTime: product.leadTime,
            moq: product.moq,
            obicNo: product.obicNo,
            products: null,
            quantity: product.quantity,
            updatedAt: product.updatedAt,
            userId: product.userId
          };
          this.productSets.push(p);
        }
        this._productSets = this.productSets;
      })
    })
  }
  onKey(value, key) {
    switch (key) {
      case 'products':
        this.productSets = this.searchProducts(value);
        break;
      case 'customers':
        this.customers = this.searchCustomers(value);
        break;
      case 'salesD':
        this.salesD = this.searchSalesD(value);
        break;
      case 'contractors':
        this.contractors = this.searchContractors(value);
        break;

      case 'users':
        this.users = this.searchUsers(value);
        break;

      default:
        break;
    }
  }
  onClick(key) {
    switch (key) {
      case 'products':
        this.productSets = this._productSets;
        break;
      case 'customers':
        this.customers = this._customers;
        break;
      case 'users':
        this.users = this._users;
        break;

      default:
        break;
    }
  }
  searchProducts(value: string) {
    let filter = value.toLowerCase();
    this.productSets = this._productSets;
    return this.productSets.filter(option => option.productName.toLowerCase().includes(filter));
  }
  searchUsers(value: string) {
    let filter = value.toLowerCase();
    this.users = this._users;
    return this.users.filter(option => option.firstName.toLowerCase().includes(filter));
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
      const dueDate = new Date(value);
      const deliveryDate = dueDate;
      deliveryDate.setDate(dueDate.getDate() - 14);

      this.orderForm.get("deliveryDate").setValue(deliveryDate.toISOString().substring(0, 10));
    }
  }

  isItType(customer: string[], type: string) {
    return customer.includes(type);
  }
}
