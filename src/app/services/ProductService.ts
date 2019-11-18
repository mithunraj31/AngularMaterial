import { ProductSet } from './../models/ProductSet';
import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductService {

    private getProductUrl = "assets/data/products.json";
    private getProductSetUrl =  "assets/data/productSets.json";
    constructor(private http: HttpClient){
        
    }

    getProducts() {
        return this.http.get<Product[]>(this.getProductUrl);
    }

    getProductSets() {
        return this.http.get<ProductSet[]>(this.getProductSetUrl);
    }
}