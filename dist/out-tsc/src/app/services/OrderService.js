import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let OrderService = class OrderService {
    constructor(http) {
        this.http = http;
        this.getOrdersUrl = "assets/data/orders.json";
    }
    getOrders() {
        return this.http.get(this.getOrdersUrl);
    }
};
OrderService = tslib_1.__decorate([
    Injectable()
], OrderService);
export { OrderService };
//# sourceMappingURL=OrderService.js.map