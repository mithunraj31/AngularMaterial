import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
let EditOrderDialogComponent = class EditOrderDialogComponent {
    constructor(dialogRef, data, customerService, productService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.customerService = customerService;
        this.productService = productService;
        this.selected = null;
        this.qty = null;
        this.qtyError = false;
        this.viewSelectd = [];
        this.saveProducts = [];
        this.customers = [];
        this.products = [];
        this.productSets = [];
    }
    ngOnInit() {
        this.getCustomerData();
        this.initializeCustomerForm();
        this.getProductData();
    }
    getCustomerData() {
        this.customerService.getCustomers().subscribe(result => {
            this.customers = result;
            console.log(this.customers);
        });
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
    onCancelClick() {
        this.dialogRef.close(null);
    }
    onSubmit() {
        if (this.orderForm.valid) {
            this.dialogRef.close(this.orderForm.value);
        }
    }
    getErrorMessage(attribute) {
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
            const saveProductComponent = {
                productId: this.products[this.selected].productId,
                quantity: this.qty
            };
            this.saveProducts.push(saveProductComponent);
            this.viewSelectd.push({
                productId: this.products[this.selected].productId,
                productName: this.products[this.selected].productName,
                quantity: this.qty
            });
            console.log(this.viewSelectd);
            this.qtyError = false;
            this.selected = null;
            this.qty = null;
        }
        else {
            this.qtyError = true;
        }
    }
    removeComponent(id) {
        this.viewSelectd.splice(id, 1);
        this.saveProducts.splice(id, 1);
    }
    getProductData() {
        this.productService.getProducts().subscribe(result => {
            this.products = result;
        });
        this.productService.getProductSets().subscribe(result => {
            this.productSets = result;
        });
    }
};
EditOrderDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-edit-order-dialog',
        templateUrl: './edit-order-dialog.component.html',
        styleUrls: ['./edit-order-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], EditOrderDialogComponent);
export { EditOrderDialogComponent };
//# sourceMappingURL=edit-order-dialog.component.js.map