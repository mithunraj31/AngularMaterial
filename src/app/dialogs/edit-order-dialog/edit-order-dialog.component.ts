import { User } from './../../models/User';
import { SaveOrder } from './../../models/SaveOrder';
import { Order } from './../../models/Order';
import { Component, OnInit, Inject } from '@angular/core';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { Product } from 'src/app/models/Product';
import { ProductSet } from 'src/app/models/ProductSet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerService } from 'src/app/services/CustomerService';
import { ProductService } from 'src/app/services/ProductService';
import { UserService } from 'src/app/services/UserService';

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
  products: Product[] = [];
  productSets: ProductSet[] = [];
  users: User[] = []
  constructor(
    public dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
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
    console.log("popup data");
    console.log(this.data);
    this.orderForm = new FormGroup({
      "proposalNo": new FormControl(this.data.proposalNo, [
        Validators.required
      ]),
      "customerId": new FormControl(this.data.customer.customerId, [
        Validators.required
      ]),
      "salesDestinationId": new FormControl(this.data.salesDestination.customerId, [
        Validators.required
      ]),
      "contractorId": new FormControl(this.data.contractor.customerId, [
        Validators.required
      ]),
      "receivedDate": new FormControl(new Date(this.data.receivedDate).getDate(), [
        Validators.required
      ]),
      "dueDate": new FormControl(this.data.dueDate, [
        Validators.required
      ]),
      "salesUserId": new FormControl(this.data.salesUser.userId, [
        Validators.required
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
    if (this.orderForm.valid) {
      const order: SaveOrder = this.orderForm.value;
      order.orderedProducts = this.saveProducts;
      const date:Date  = new Date(this.orderForm.value.receivedDate);
      order.receivedDate = date;
      this.dialogRef.close(order);
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
