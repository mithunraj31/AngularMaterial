import { Component, OnInit, Inject } from '@angular/core';
import { SaveOrder } from 'src/app/models/SaveOrder';
import { Product } from 'src/app/models/Product';
import { Customer } from 'src/app/models/Customer';
import { User } from 'src/app/models/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-order-confirmation',
  templateUrl: './add-order-confirmation.component.html',
  styleUrls: ['./add-order-confirmation.component.scss']
})
export class AddOrderConfirmationComponent implements OnInit {
  products: Product[] = [];
  customerName;
  salesDestination;
  contractor;
  salesUser;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: OrderConfimationData,
    public dialogRef: MatDialogRef<AddOrderConfirmationComponent>,
  ) { }

  ngOnInit() {
    this.populateProducts();
    this.populateNames();
    console.log(this.data);
    // console.log(this.products);
  }
  onCancelClick() {
    this.dialogRef.close(0);
  }
  onOkClick() {
    this.dialogRef.close(1);
  }
  onReturnClick() {
    this.dialogRef.close(2);
  }

  populateProducts() {
    this.data.order.orderedProducts.forEach(product => {
      let p: Product;
      const found = this.data.products.filter(pr => pr.productId === product.productId);
      p = found[0];
      p.quantity = product.quantity;
      this.products.push(p);
    });
    // console.log(this.products);
  }
  populateNames() {
    this.data.customers.forEach(c => {
      if (c.customerId == this.data.order.customerId) {
        this.customerName = c.customerName;
      }
      if (c.customerId == this.data.order.contractorId) {
        this.contractor = c.customerName;
      }
      if (c.customerId == this.data.order.salesDestinationId) {
        this.salesDestination = c.customerName;
      }
    });
    const user = this.data.users.filter(u => u.userId == this.data.order.salesUserId);
    this.salesUser = user ? user[0].firstName : '';
  }

}

interface OrderConfimationData {
  order: SaveOrder;
  products: Product[];
  customers: Customer[];
  users: User[];

}



