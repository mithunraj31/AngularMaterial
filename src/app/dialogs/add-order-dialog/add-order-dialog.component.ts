import { UtilService } from './../../services/UtilService';
import { User } from './../../models/User';
import { SaveOrder } from './../../models/SaveOrder';
import { ProductSet } from './../../models/ProductSet';
import { CustomerService } from './../../services/CustomerService';
import { Customer } from './../../models/Customer';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/models/Product';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { ProductService } from 'src/app/services/ProductService';
import { UserService } from 'src/app/services/UserService';

@Component({
  selector: 'app-add-order-dialog',
  templateUrl: './add-order-dialog.component.html',
  styleUrls: ['./add-order-dialog.component.scss']
})
export class AddOrderDialogComponent implements OnInit {

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
  saveOrder: SaveOrder;
  users: User[] = [];
  _users: User[] = [];
  productSearch = "";
  selectedProductSets = [];
  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
    private customerService: CustomerService,
    private productService: ProductService,
    private userService: UserService,
    private util: UtilService
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
      console.log(this.customers)
    })
  }
  getUserData() {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
      this._users = result;

    })
  }

  initializeCustomerForm() {
    this.orderForm = new FormGroup({
      "proposalNo": new FormControl("", [
        Validators.required
      ]),
      "customerId": new FormControl("", [
        Validators.required
      ]),
      "salesDestinationId": new FormControl("", [
        this.data ? Validators.required : Validators.nullValidator
      ]),
      "contractorId": new FormControl("", [
        this.data ? Validators.required : Validators.nullValidator
      ]),
      "receivedDate": new FormControl("", [
        this.data ? Validators.required : Validators.nullValidator
      ]),
      "dueDate": new FormControl("", [
        Validators.required
      ]),
      "deliveryDate": new FormControl("", [
        this.data ? Validators.required : Validators.nullValidator
      ]),
      "salesUserId": new FormControl("", [
        Validators.required
      ]),

    })
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.orderForm.valid) {
      this.saveOrder = this.orderForm.value;
      this.saveOrder.orderedProducts = this.saveProducts;
      const date: Date = new Date(this.saveOrder.receivedDate);
      console.log(this.saveOrder.receivedDate);
      if (this.saveOrder.receivedDate) {
        this.saveOrder.receivedDate = new Date(this.orderForm.value.receivedDate).toISOString();
      }
      if (this.saveOrder.dueDate) {
        this.saveOrder.dueDate = new Date(this.orderForm.value.dueDate).toISOString();
      }
      if (this.saveOrder.deliveryDate) {
        this.saveOrder.deliveryDate = new Date(this.orderForm.value.deliveryDate).toISOString();
      }
      this.dialogRef.close(this.saveOrder);
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
      console.log(this.selected);

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
      console.log(this.viewSelectd);
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
            currency: product.currency,
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
            userId: product.userId,
            sort: product.sort,
            display: product.display
          };
          this.productSets.push(p);
        }
      })
      this.selectedProductSets = this.productSets;
      this._productSets = this.productSets;
    })
  }
  // Receive user input and send to search method**
  onKey(value, key) {
    switch (key) {
      case 'products':
        this.selectedProductSets = this.searchProducts(value);
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
        this.selectedProductSets = this._productSets;
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
    this.selectedProductSets = this._productSets;
    return this.selectedProductSets.filter(option => option.productName.toLowerCase().startsWith(filter));
  }
  searchUsers(value: string) {
    let filter = value.toLowerCase();
    this.users = this._users;
    return this.users.filter(option => option.firstName.toLowerCase().startsWith(filter));
  }
  searchCustomers(value: string) {
    let filter = value.toLowerCase();
    this.customers = this._customers;
    return this.customers.filter(option => option.customerName.toLowerCase().startsWith(filter));
  }
  searchContractors(value: string) {
    let filter = value.toLowerCase();
    this.contractors = this._customers;
    return this.contractors.filter(option => option.customerName.toLowerCase().startsWith(filter));
  }
  searchSalesD(value: string) {
    let filter = value.toLowerCase();
    this.salesD = this._customers;
    return this.salesD.filter(option => option.customerName.toLowerCase().startsWith(filter));
  }

  resetP() {
    this.productSearch = "";
    this.selectedProductSets = this.productSets;
  }

  calculateDelivery(value) {
    if (value) {
      const dueDate = new Date(value);
      const deliveryDate = dueDate;
      deliveryDate.setDate(dueDate.getDate() - 14);
      console.log(deliveryDate);
      this.orderForm.get("deliveryDate").setValue(deliveryDate.toISOString().substring(0, 10));
    }
  }
  isItType(customer: string[], type: string) {
    return customer.includes(type);
  }

}
