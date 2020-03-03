import { Order } from './../models/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductForecastService {

    private forecastProductUrl = environment.APIURL + "/product/forecast/";
    constructor(private http: HttpClient) {

    }
    getProductForecast() {
        return this.http.get<any[]>(this.forecastProductUrl);
    }

}