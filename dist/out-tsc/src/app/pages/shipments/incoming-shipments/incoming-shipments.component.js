import * as tslib_1 from "tslib";
import { MatTableDataSource, MatTable, MatPaginator } from '@angular/material';
import { Component, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
let IncomingShipmentsComponent = class IncomingShipmentsComponent {
    constructor(shipmentService, dialog) {
        this.shipmentService = shipmentService;
        this.dialog = dialog;
        this.columnsToDisplay = [
            'shipmentNo',
            'arrivalDate',
            'user',
            'actions'
        ];
        this.dataSource = new MatTableDataSource();
        this.shipments = [];
    }
    ngOnInit() {
        this.getShipments();
    }
    getShipments() {
        this.shipmentService.getshipments().subscribe(result => {
            this.shipments = result;
            this.dataSource.data = this.shipments;
            this.dataSource.paginator = this.paginator;
        });
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    editShipment(element) {
    }
    deleteShipment(element) {
    }
    openDialog() {
    }
};
tslib_1.__decorate([
    ViewChild(MatTable, { static: true })
], IncomingShipmentsComponent.prototype, "table", void 0);
tslib_1.__decorate([
    ViewChild(MatPaginator, { static: true })
], IncomingShipmentsComponent.prototype, "paginator", void 0);
IncomingShipmentsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-incoming-shipments',
        templateUrl: './incoming-shipments.component.html',
        styleUrls: ['./incoming-shipments.component.scss'],
        animations: [
            trigger('detailExpand', [
                state('collapsed', style({ height: '0px', minHeight: '0' })),
                state('expanded', style({ height: '*' })),
                transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ]
    })
], IncomingShipmentsComponent);
export { IncomingShipmentsComponent };
//# sourceMappingURL=incoming-shipments.component.js.map