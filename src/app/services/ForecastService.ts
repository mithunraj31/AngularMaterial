import { Order } from './../models/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ForecastService {

    private forecastUrl = environment.APIURL + "/order/forecast/";
    private forecastProductUrl = environment.APIURL + "/product/forecast/2020/03";
    // private forecastUrl ="assets/data/foreccast.json";
    constructor(private http: HttpClient) {

    }
    getForecast() {
        return this.http.get<Order[]>(this.forecastUrl);
    }
    getProductForecast(year:number,month:number) {
        return this.http.get<any[]>(this.forecastProductUrl);
    }

}