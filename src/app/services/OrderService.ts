import { SaveOrder } from './../models/SaveOrder';
import { Order } from './../models/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrderService {
    private getOrdersUrl = environment.APIURL + "/order"
    constructor(private http: HttpClient){
        
    }

    getOrders(){
        return this.http.get<Order[]>(this.getOrdersUrl);
    }

    addOrder(order: SaveOrder){
        return this.http.post<SaveOrder>(this.getOrdersUrl, order);
    }
}