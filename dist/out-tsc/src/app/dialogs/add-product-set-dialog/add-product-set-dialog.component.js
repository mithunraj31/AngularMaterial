import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
let AddProductSetDialogComponent = class AddProductSetDialogComponent {
    constructor(dialogRef, data, productService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.productService = productService;
        this.selected = null;
        this.qty = null;
        this.qtyError = false;
        this.saveProducts = [];
        this.viewSelectd = [];
        this.products = [];
    }
    ngOnInit() {
        this.initializeProductForm();
        this.getProductData();
    }
    getProductData() {
        this.productService.getProducts().subscribe(result => {
            this.products = result;
        });
    }
    initializeProductForm() {
        this.productForm = new FormGroup({
            "productName": new FormControl("", [
                Validators.required
            ]),
            "description": new FormControl("", [
                Validators.required
            ]),
            "price": new FormControl("", [
                Validators.required
            ]),
            "quantity": new FormControl("", [
                Validators.required
            ]),
            "leadTime": new FormControl("", [
                Validators.required
            ]),
            "moq": new FormControl("", [
                Validators.required
            ]),
            "obicNo": new FormControl("", [
                Validators.required
            ]),
        });
    }
    onCancelClick() {
        this.dialogRef.close(null);
    }
    onSubmit() {
        if (this.productForm.valid) {
            this.saveProductSet = this.productForm.value;
            this.saveProductSet.products = this.saveProducts;
            this.dialogRef.close(this.saveProductSet);
        }
    }
    getErrorMessage(attribute) {
        return this.productForm.get(attribute).hasError('required') ? 'You must enter a value' : '';
        // switch (attribute) {
        //   case "name":
        //       return this.productForm.get(attribute).hasError('required') ? 'You must enter a value':'' ;
        //     break;
        //   default:
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
};
AddProductSetDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-add-product-set-dialog',
        templateUrl: './add-product-set-dialog.component.html',
        styleUrls: ['./add-product-set-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], AddProductSetDialogComponent);
export { AddProductSetDialogComponent };
//# sourceMappingURL=add-product-set-dialog.component.js.map