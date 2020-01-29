import { Order } from './../models/Order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ForecastService {

    private forecastUrl = environment.APIURL + "/order/forecast/";
    // private forecastUrl ="assets/data/foreccast.json";
    constructor(private http: HttpClient) {

    }
    getForecast() {
        return this.http.get<Order[]>(this.forecastUrl);
    }

}