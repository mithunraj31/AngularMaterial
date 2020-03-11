import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let IncomingShipmentService = class IncomingShipmentService {
    constructor(http) {
        this.http = http;
        this.getIncomingShipmentUrl = "assets/data/IncomingShipments.json";
    }
    getshipments() {
        return this.http.get(this.getIncomingShipmentUrl);
    }
};
IncomingShipmentService = tslib_1.__decorate([
    Injectable()
], IncomingShipmentService);
export { IncomingShipmentService };
//# sourceMappingURL=IncomingShipmentService.js.map