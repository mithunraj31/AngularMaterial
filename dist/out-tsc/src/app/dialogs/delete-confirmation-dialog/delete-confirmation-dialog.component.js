import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
let DeleteConfirmationDialogComponent = class DeleteConfirmationDialogComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ngOnInit() {
    }
};
DeleteConfirmationDialogComponent = tslib_1.__decorate([
    Component({
        selector: 'app-delete-confirmation-dialog',
        templateUrl: './delete-confirmation-dialog.component.html',
        styleUrls: ['./delete-confirmation-dialog.component.scss']
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], DeleteConfirmationDialogComponent);
export { DeleteConfirmationDialogComponent };
//# sourceMappingURL=delete-confirmation-dialog.component.js.map