import { SaveProductSet } from './../models/saveProductSet';
import { environment } from './../../environments/environment';
import { ProductSet } from './../models/ProductSet';
import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductService {

    private productUrl = environment.APIURL + "/product/";
    private productSetUrl = environment.APIURL + "/productset/";
    constructor(private http: HttpClient) {

    }

    getProducts() {
        return this.http.get<Product[]>(this.productUrl);
    }

    getProductSets() {
        return this.http.get<ProductSet[]>(this.productSetUrl);
    }

    saveProduct(product: Product) {
        return this.http.post<Product>(this.productUrl, product);
    }

    updateProduct(product: Product) {
        return this.http.put<Product>(this.productUrl + product.productId, product);
    }

    deleteProduct(id: number) {
        return this.http.delete<Product>(this.productUrl + id);
    }

    addProductSet(saveProductSet: SaveProductSet) {
        return this.http.post<SaveProductSet>(this.productSetUrl, saveProductSet);
    }

    deleteProductSet(id: number) {
        return this.http.delete<SaveProductSet>(this.productSetUrl + id);
    }

    editProductSet(productSet: SaveProductSet) {
        return this.http.put<SaveProductSet>(this.productSetUrl + productSet.productId, productSet);
    }

    getProductById(id: number) {
        return this.http.get<Product>(this.productUrl + id);
    }
    getProductSetById(id: number) {
        return this.http.get<ProductSet>(this.productSetUrl + id);
    }

}