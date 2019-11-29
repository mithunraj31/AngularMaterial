import { environment } from './../../environments/environment';
import { ProductSet } from './../models/ProductSet';
import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductService {

    private getProductUrl = environment.APIURL+"/product/";
    private getProductSetUrl =  environment.APIURL+"/productset";
    constructor(private http: HttpClient){
        
    }

    getProducts() {
        return this.http.get<Product[]>(this.getProductUrl);
    }

    getProductSets() {
        return this.http.get<ProductSet[]>(this.getProductSetUrl);
    }
}