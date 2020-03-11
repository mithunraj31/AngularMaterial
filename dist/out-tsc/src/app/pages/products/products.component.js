import * as tslib_1 from "tslib";
import { DeleteConfirmationDialogComponent } from './../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { AddProductDialogComponent } from './../../dialogs/add-product-dialog/add-product-dialog.component';
import { Component, ViewChild } from '@angular/core';
import { MatTable, MatPaginator, MatTableDataSource } from '@angular/material';
import { UpdateProductDialogComponent } from 'src/app/dialogs/update-product-dialog/update-product-dialog.component';
let ProductsComponent = class ProductsComponent {
    constructor(dialog, productService) {
        this.dialog = dialog;
        this.productService = productService;
        this.displayedColumns = [
            'name',
            'description',
            'price',
            'qty',
            'leadTime',
            'moq',
            'obicNo',
            'actions'
        ];
        this.products = [];
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit() {
        this.productService.getProducts().subscribe(result => {
            console.log(result);
            this.products = result;
            this.dataSource.data = this.products;
            this.dataSource.paginator = this.paginator;
        });
    }
    openDialog() {
        const dialogRef = this.dialog.open(AddProductDialogComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                const product = result;
                // change concat to replace when using real api
                this.products.push(product);
                this.dataSource.data = this.products;
                console.log(product);
            }
        });
    }
    editProduct(i) {
        console.log(this.products[i]);
        const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
            width: '600px',
            data: this.products[this.products.indexOf(i)]
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                const product = result;
                // change concat to replace when using real api
                this.products[this.products.indexOf(i)] = product;
                this.dataSource.data = this.products;
                console.log(product);
            }
        });
    }
    deleteProduct(i) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '600px',
            data: this.products[this.products.indexOf(i)].productName
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(this.products.indexOf(i));
                this.products.splice(this.products.indexOf(i), 1);
                this.dataSource.data = this.products;
            }
        });
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
};
tslib_1.__decorate([
    ViewChild(MatTable, { static: true })
], ProductsComponent.prototype, "table", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], ProductsComponent.prototype, "paginator", void 0);
ProductsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-products',
        templateUrl: './products.component.html',
        styleUrls: ['./products.component.scss']
    })
], ProductsComponent);
export { ProductsComponent };
//# sourceMappingURL=products.component.js.map