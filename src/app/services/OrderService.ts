import { SaveOrder } from './../models/SaveOrder';
import { Order } from './../models/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrderService {

    private getOrdersUrl = environment.APIURL + "/order/"
    constructor(private http: HttpClient) {

    }

    getOrders() {
        return this.http.get<Order[]>(this.getOrdersUrl);
    }
    getFulfilledOrders() {
        return this.http.get<Order[]>(this.getOrdersUrl + 'fulfilled/');
    }

    addOrder(order: SaveOrder) {
        return this.http.post<SaveOrder>(this.getOrdersUrl, order);
    }

    deleteOrder(id: number) {
        return this.http.delete<any>(this.getOrdersUrl + id);
    }

    editOrder(order: SaveOrder) {
        console.log(this.getOrdersUrl + order.orderId);
        console.log(order);
        return this.http.put<SaveOrder>(this.getOrdersUrl + order.orderId, order);
    }

    fulfillOrder(id: number) {
        const fmodel: FulfillOrderModel = {
            orderId: id,
            fulfillment: true,
        }
        return this.http.post<FulfillOrderModel>(this.getOrdersUrl + "fulfillment/", fmodel);
    }

    unFulfillOrder(orderId: number) {
        const fmodel: FulfillOrderModel = {
            orderId: orderId,
            fulfillment: false,
        };
        return this.http.post<FulfillOrderModel>(this.getOrdersUrl + "fulfillment/", fmodel);
    }
    display(orderIdIn: number, value: boolean){
        const display = {
            orderId : orderIdIn,
            display : value
        };
        return this.http.post<FulfillOrderModel>(this.getOrdersUrl + "display/", display);
    }
}

export class FulfillOrderModel {
    orderId: number;
    fulfillment: boolean;
};