import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator } from '@angular/material';
import { AddCustomerComponent } from 'src/app/dialogs/add-customer/add-customer.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { EditCustomerDialogComponent } from 'src/app/dialogs/edit-customer-dialog/edit-customer-dialog.component';
let CustomersComponent = class CustomersComponent {
    constructor(dialog, customerService) {
        this.dialog = dialog;
        this.customerService = customerService;
        this.displayedColumns = [
            'customerName',
            'zip',
            'address',
            'tel',
            'contactName',
            'type',
            'actions'
        ];
        this.customers = [];
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit() {
        this.customerService.getCustomers().subscribe(result => {
            this.customers = result;
            this.dataSource.data = this.customers;
            this.dataSource.paginator = this.paginator;
            console.log(result);
        });
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    openDialog() {
        const dialogRef = this.dialog.open(AddCustomerComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                const customer = result;
                // change concat to replace when using real api
                this.customers.push(customer);
                this.dataSource.data = this.customers;
            }
        });
    }
    deleteCustomer(i) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '600px',
            data: this.customers[this.customers.indexOf(i)].contactName
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(this.customers.indexOf(i));
                this.customers.splice(this.customers.indexOf(i), 1);
                this.dataSource.data = this.customers;
            }
        });
    }
    editCustomer(i) {
        const dialogRef = this.dialog.open(EditCustomerDialogComponent, {
            width: '600px',
            data: this.customers[this.customers.indexOf(i)]
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                const customer = result;
                // change concat to replace when using real api
                this.customers[this.customers.indexOf(i)] = customer;
                this.dataSource.data = this.customers;
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatTable, { static: true })
], CustomersComponent.prototype, "table", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], CustomersComponent.prototype, "paginator", void 0);
CustomersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-customers',
        templateUrl: './customers.component.html',
        styleUrls: ['./customers.component.scss']
    })
], CustomersComponent);
export { CustomersComponent };
//# sourceMappingURL=customers.component.js.map