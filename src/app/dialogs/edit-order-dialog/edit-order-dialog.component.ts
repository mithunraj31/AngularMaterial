import { Component, OnInit, Inject } from '@angular/core';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/models/Customer';
import { Product } from 'src/app/models/Product';
import { ProductSet } from 'src/app/models/ProductSet';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomerService } from 'src/app/services/CustomerService';
import { ProductService } from 'src/app/services/ProductService';

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
  constructor(
    public dialogRef: MatDialogRef<EditOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getCustomerData();
    this.initializeCustomerForm();
    this.getProductData();
  }
  getCustomerData() {
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result;
      console.log(this.customers)
    })
  }

  initializeCustomerForm() {
    console.log("popup data");
    console.log(this.data);
    this.orderForm = new FormGroup({
      "proposalNo": new FormControl(this.data.proposalNo, [
        Validators.required
      ]),
      "customer": new FormControl(this.data.customer.customerId, [
        Validators.required
      ]),
      "salesDestination": new FormControl(this.data.salesDestination.customerId, [
        Validators.required
      ]),
      "contractor": new FormControl(this.data.contractor.customerId, [
        Validators.required
      ]),
      "recievedDate": new FormControl(this.data.recievedDate, [
        Validators.required
      ]),
      "dueDate": new FormControl(this.data.dueDate, [
        Validators.required
      ]),
      "salesUser": new FormControl(this.data.salesUser, [
        Validators.required
      ]),

    });
    //this.orderForm.controls['customer'].setValue(this.data.customer.customerId,{onlySelf: true})
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit() {
    if (this.orderForm.valid) {
      this.dialogRef.close(this.orderForm.value);
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
        productId: this.products[this.selected].productId,
        quantity: this.qty
      }
      this.saveProducts.push(saveProductComponent);
      this.viewSelectd.push({
        productId: this.products[this.selected].productId,
        productName: this.products[this.selected].productName,
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
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    })
    this.productService.getProductSets().subscribe(result => {
      this.productSets = result;
    })
  }

}
