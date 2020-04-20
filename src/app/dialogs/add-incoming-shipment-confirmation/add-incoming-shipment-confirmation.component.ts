import { Component, OnInit, Inject } from '@angular/core';
import { SaveIncomingShipment } from 'src/app/models/SaveIncomingShipment';
import { Product } from 'src/app/models/Product';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-incoming-shipment-confirmation',
  templateUrl: './add-incoming-shipment-confirmation.component.html',
  styleUrls: ['./add-incoming-shipment-confirmation.component.scss']
})
export class AddIncomingShipmentConfirmationComponent implements OnInit {

  productName;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductSetConfimationData,
    public dialogRef: MatDialogRef<AddIncomingShipmentConfirmationComponent>,
  ) { }

  ngOnInit() {
    if (!this.data.selected) {

      this.populateProducts();
    }
    // console.log(this.data);
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

    const found = this.data.products.filter(pr => pr.productId == this.data.order.productId);
    this.productName = found[0].productName;
  }

}

interface ProductSetConfimationData {
  order: SaveIncomingShipment;
  products: Product[];
  selected: any;

}


