import * as tslib_1 from "tslib";
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
let ProductService = class ProductService {
    constructor(http) {
        this.http = http;
        this.getProductUrl = environment.APIURL + "/product/";
        this.getProductSetUrl = environment.APIURL + "/productset";
    }
    getProducts() {
        return this.http.get(this.getProductUrl);
    }
    getProductSets() {
        return this.http.get(this.getProductSetUrl);
    }
};
ProductService = tslib_1.__decorate([
    Injectable()
], ProductService);
export { ProductService };
//# sourceMappingURL=ProductService.js.map