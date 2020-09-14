import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { environment } from 'src/environments/environment';

@Injectable()
export class DashboardService {
    private productSummery = environment.APIURL + "/product/summary/";
    constructor(private http: HttpClient) {

    }
    public getProductSummery(productId: number){
        const today:Date = new Date();
        return this.http.get<any[]>(this.productSummery+productId+"/"+today.getFullYear()+"/"+(today.getMonth()+1));
    }
}