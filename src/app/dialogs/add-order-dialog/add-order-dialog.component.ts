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
  products: Product[] = [];
  productSets: ProductSet[] = [];
  saveOrder: SaveOrder;
  users: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private productService: ProductService,
    private userService: UserService
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
      console.log(this.customers)
    })
  }
  getUserData() {
    this.userService.getUsers().subscribe(result => {
      this.users = result;
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
        Validators.required
      ]),
      "contractorId": new FormControl("", [
        Validators.required
      ]),
      "receivedDate": new FormControl("", [
        Validators.required
      ]),
      "dueDate": new FormControl("", [
        Validators.required
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
      const date:Date  = new Date(this.orderForm.value.receivedDate);
      this.saveOrder.receivedDate = date;
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
        for(let product of presult){
          const p: ProductSet ={
            
            active:product.active,
            productId :product.productId,
            price :product.price,
            productName :product.productName,
            createdAt:product.createdAt,
            description:product.description,
            isSet:product.isSet,
            leadTime:product.leadTime,
            moq:product.moq,
            obicNo:product.obicNo,
            products:null,
            quantity:product.quantity,
            updatedAt:product.updatedAt,
            userId:product.userId
          };
          this.productSets.push(p);
        }
      })
    })
  }


}
