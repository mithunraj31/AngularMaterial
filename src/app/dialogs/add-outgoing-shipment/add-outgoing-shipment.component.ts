import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { SaveOutgoingShipment } from 'src/app/models/SaveOutgoingShipment';
import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from 'src/app/services/ProductService';
import { CustomerService } from 'src/app/services/CustomerService';
import { Customer } from 'src/app/models/Customer';

@Component({
  selector: 'app-add-outgoing-shipment',
  templateUrl: './add-outgoing-shipment.component.html',
  styleUrls: ['./add-outgoing-shipment.component.scss']
})
export class AddOutgoingShipmentComponent implements OnInit {
  outgoingShipmentForm: FormGroup;
  selected: number=null;
  qty=null;
  qtyError=false;
  price=null;
  priceError=false;
  customers: Customer[] = [];
  viewSelectd: {productId: number,productName: String,quantity: number}[] = [];
  products: Product[] = [];
  saveOutgoingShipment:SaveOutgoingShipment;
  saveShipmentProducts: SaveProductComponent [] = [];
  constructor(
    public dialogRef: MatDialogRef<AddOutgoingShipmentComponent>,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService
  ) { }


  ngOnInit() {
   this.initializeShipmentForm();
    this.getProductData();
    this.getCustomerData();
  }
  initializeShipmentForm(){
    this.outgoingShipmentForm = new FormGroup({
      "shipmentNo": new FormControl("",[
        Validators.required
      ]),
      "shipmentDate": new FormControl("",[
        Validators.required
      ]),
      "salesDestinationId": new FormControl("",[
        Validators.required
      ]),
    })
  }
  getCustomerData() {
    this.customerService.getCustomers().subscribe(result => {
      this.customers = result;
      console.log(this.customers)
    })
  }
  getProductData() {
    this.productService.getProducts().subscribe(result=>{
      this.products = result;
    })
  }
  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSubmit(){
    if(this.outgoingShipmentForm.valid){
      this.saveOutgoingShipment = this.outgoingShipmentForm.value;
      this.saveOutgoingShipment.products = this.saveShipmentProducts;
      this.saveOutgoingShipment.shipmentDate = new Date(this.outgoingShipmentForm.value.shipmentDate).toISOString();
      console.log(this.saveOutgoingShipment);
      this.dialogRef.close(this.saveOutgoingShipment);
    }
  }
  getErrorMessage(attribute:string) {
    return this.outgoingShipmentForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    // switch (attribute) {
    //   case "name":
    //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
    //     break;
    
    //   default:
    //     break;
    // }
  }
  addComponent(){
    if(this.selected && this.qty){
      console.log(this.selected);
      
      const saveShipmentProduct: SaveProductComponent = {
        productId : this.products[this.selected].productId,
        quantity : this.qty
      }
      this.saveShipmentProducts.push(saveShipmentProduct);
      this.viewSelectd.push({
        productId: this.products[this.selected].productId,
        productName: this.products[this.selected].productName,
        quantity: this.qty
      })
      console.log(this.viewSelectd);
      this.qtyError = false;
      this.selected=null;
      this.qty = null;
      this.price = null;
      this.priceError =false;
    } else if(!this.qty){
      this.qtyError = true;
    } 
  }
  removeComponent(id: number){
    this.viewSelectd.splice(id,1);
    this.saveShipmentProducts.splice(id,1);
  }

}
