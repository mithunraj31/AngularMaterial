import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductService {

    getProductUrl = "assets/data/products.json";
    constructor(private http: HttpClient){
        
    }

    getProducts(){
        return this.http.get<Product[]>(this.getProductUrl);
    }
}