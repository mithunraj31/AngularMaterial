import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let CustomerService = class CustomerService {
    constructor(http) {
        this.http = http;
        this.getCustomerUrl = "assets/data/customers.json";
    }
    getCustomers() {
        return this.http.get(this.getCustomerUrl);
    }
};
CustomerService = tslib_1.__decorate([
    Injectable()
], CustomerService);
export { CustomerService };
//# sourceMappingURL=CustomerService.js.map