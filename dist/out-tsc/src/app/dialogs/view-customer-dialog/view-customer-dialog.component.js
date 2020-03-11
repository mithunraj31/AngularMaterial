import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let ViewCustomerDialogComponent = class ViewCustomerDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
};
ViewCustomerDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-view-customer-dialog',
        templateUrl: './view-customer-dialog.component.html',
        styleUrls: ['./view-customer-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], ViewCustomerDialogComponent);
export { ViewCustomerDialogComponent };
//# sourceMappingURL=view-customer-dialog.component.js.map