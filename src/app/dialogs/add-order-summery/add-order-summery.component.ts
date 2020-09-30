import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/ProductService';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Widget } from 'src/app/models/Widget';
import { ProductSet } from 'src/app/models/ProductSet';

@Component({
  selector: 'app-add-order-summery',
  templateUrl: './add-order-summery.component.html',
  styleUrls: ['./add-order-summery.component.scss']
})
export class AddOrderSummeryComponent implements OnInit {
  selected: Product []= [];
  productSearch = "";
  productSets: ProductSet[] = [];
  _productSets: ProductSet[] = [];
  selectedProductSets = [];
  summeryForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddOrderSummeryComponent>,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.getProductData();
    this.initializeSummeryForm();
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
  initializeSummeryForm() {
    this.summeryForm = new FormGroup({
      "title": new FormControl("", [
        Validators.required
      ]),
      "product": new FormControl("", [
        Validators.required
      ])

    })


  }
  onKey(value) {
    this.selectedProductSets = this.search(value);
  }
  search(value: string) {
    let filter = value.toLowerCase();
    this.selectedProductSets = this._productSets;
    return this.selectedProductSets.filter(option => option.productName.toLowerCase().includes(filter));
  }
  resetP() {
    this.productSearch = "";
    this.selected = this.selectedProductSets;
  }
  onSubmit(){

    let w:Widget = {
      title: this.summeryForm.value.title,
      type: 0,
      data : {
        productId:this.summeryForm.value.product
      }
    }
    if(this.checkProductIsSet(this.summeryForm.value.product)){
      w.type=1
    }

    const widgets:Widget[] = JSON.parse(localStorage.getItem("widgets"));
    if(widgets!=null && widgets.length>0) {
      widgets.push(w);
      localStorage.setItem("widgets",JSON.stringify(widgets));
    } else {
      localStorage.setItem("widgets",JSON.stringify([w]));
    }
    this.dialogRef.close(true);
  }

  onCancelClick(){
    this.dialogRef.close(false);
  }


  checkProductIsSet(productId:number){
    const found = this._productSets.filter(x=>x.productId==productId);
    console.log(found[0]);
    if(found[0].products!=null){
      return true;
    }else{
      return false;
    }
  }
}

