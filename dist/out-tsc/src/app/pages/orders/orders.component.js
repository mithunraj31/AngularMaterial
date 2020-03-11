import * as tslib_1 from "tslib";
import { AddOrderDialogComponent } from './../../dialogs/add-order-dialog/add-order-dialog.component';
import { MatTableDataSource, MatTable, MatPaginator } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { ViewCustomerDialogComponent } from 'src/app/dialogs/view-customer-dialog/view-customer-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EditOrderDialogComponent } from 'src/app/dialogs/edit-order-dialog/edit-order-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
let OrdersComponent = class OrdersComponent {
    constructor(dialog, orderService) {
        this.dialog = dialog;
        this.orderService = orderService;
        this.columnsToDisplay = [
            'proposalNo',
            'customer',
            'salesDestination',
            'contractor',
            'recievedDate',
            'dueDate',
            'salesUser',
            'actions'
        ];
        this.orders = [];
        this.dataSource = new MatTableDataSource();
    }
    ngOnInit() {
        this.getOrderData();
        this.dataSource.paginator = this.paginator;
    }
    getOrderData() {
        this.orderService.getOrders().subscribe(result => {
            this.orders = result;
            this.dataSource.data = this.orders;
            console.log(this.orders);
        });
    }
    viewCustomer(customer) {
        const dialogRef = this.dialog.open(ViewCustomerDialogComponent, {
            width: '600px',
            data: customer
        });
    }
    openDialog() {
        const dialogRef = this.dialog.open(AddOrderDialogComponent, {
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                const order = result;
                // change concat to replace when using real api
                this.orders.push(order);
                this.dataSource.data = this.orders;
            }
        });
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    editOrder(order) {
        const dialogRef = this.dialog.open(EditOrderDialogComponent, {
            width: '600px',
            data: order
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            if (result) {
                const order = result;
                // change concat to replace when using real api
                console.log(order);
            }
        });
    }
    deleteOrder(order) {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '600px',
            data: this.orders[this.orders.indexOf(order)].proposalNo
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log(this.orders.indexOf(order));
                this.orders.splice(this.orders.indexOf(order), 1);
                this.dataSource.data = this.orders;
            }
        });
    }
};
tslib_1.__decorate([
    ViewChild(MatTable, { static: true })
], OrdersComponent.prototype, "table", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], OrdersComponent.prototype, "paginator", void 0);
OrdersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-orders',
        templateUrl: './orders.component.html',
        styleUrls: ['./orders.component.scss'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ]
    })
], OrdersComponent);
export { OrdersComponent };
//# sourceMappingURL=orders.component.js.map