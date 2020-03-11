import * as tslib_1 from "tslib";
import { AddProductSetDialogComponent } from './../../dialogs/add-product-set-dialog/add-product-set-dialog.component';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EditProductSetDialogComponent } from 'src/app/dialogs/edit-product-set-dialog/edit-product-set-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
let ProductSetsComponent = class ProductSetsComponent {
    constructor(productService, dialog) {
        this.productService = productService;
        this.dialog = dialog;
        this.columnsToDisplay = [
            'productName',
            'description',
            'price',
            'quantity',
            'leadTime',
            'moq',
            'obicNo',
            'actions'
        ];
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit() {
        this.productService.getProductSets().subscribe(result => {
            this.productSets = result;
            console.log(this.productSets);
            this.dataSource.data = this.productSets;
            this.dataSource.paginator = this.paginator;
        });
    }
    deleteProduct(i) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '600px',
            data: this.productSets[this.productSets.indexOf(i)].productName
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(this.productSets.indexOf(i));
                this.productSets.splice(this.productSets.indexOf(i), 1);
                this.dataSource.data = this.productSets;
            }
        });
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openDialog() {
        const dialogRef = this.dialog.open(AddProductSetDialogComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                // change concat to replace when using real api
                // this.products.push(product);
                // this.dataSource.data = this.products;
                console.log(result);
            }
        });
    }
    editProductSet(element) {
        const dialogRef = this.dialog.open(EditProductSetDialogComponent, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                console.log(result);
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatTable, { static: true })
], ProductSetsComponent.prototype, "table", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], ProductSetsComponent.prototype, "paginator", void 0);
ProductSetsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-product-sets',
        templateUrl: './product-sets.component.html',
        styleUrls: ['./product-sets.component.scss'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ]
    })
], ProductSetsComponent);
export { ProductSetsComponent };
//# sourceMappingURL=product-sets.component.js.map