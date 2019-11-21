import { Order } from './../models/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
    private getOrdersUrl = "assets/data/orders.json"
    constructor(private http: HttpClient){
        
    }

    getOrders(){
        return this.http.get<Order[]>(this.getOrdersUrl);
    }
}