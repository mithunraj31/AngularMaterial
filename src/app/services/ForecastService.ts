import { Order } from './../models/Order';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ForecastService {

  private forecastUrl = environment.APIURL + '/order/forecast';
  private forecastProductUrl = environment.APIURL + '/product/forecast';
  private kittingUrl = environment.APIURL + '/kitting/forecast';
  private shukkaUrl = environment.APIURL + '/shippingbase/forecast';
  private nyuShukkaUrl = environment.APIURL + '/shippedbase/forecast';
  constructor(private http: HttpClient) {}


  getForecast() {
    return this.http.get<Order[]>(this.forecastUrl);
  }

  getProductForecast(year: number, month: number, patternId: number = 0) {
    const params = this.createQueryString(year, month, patternId);
    console.log(params)
    return this.http.get<any[]>(this.forecastProductUrl, { params });
    // return this.http.get<any[]>(this.forecastUrl);
  }

  getKittingForcast(year: number, month: number, patternId: number = 0) {
    const params = this.createQueryString(year, month, patternId);
    return this.http.get<any[]>(this.kittingUrl, { params });
  }

  getShukkaForcast(year: number, month: number, patternId: number = 0) {
    const params = this.createQueryString(year, month, patternId);
    return this.http.get<any[]>(this.shukkaUrl, { params });
  }

  getNyuShukkaForcast(year: number, month: number, patternId: number = 0) {
    const params = this.createQueryString(year, month, patternId);
    return this.http.get<any[]>(this.nyuShukkaUrl, { params });
  }

  private createQueryString(year: number, month: number, patternId: number) {
    const params: any = {};
    // params.append('year', year.toString());
    // params.append('month', (month + 1).toString());

    // if (patternId > 0) {
    //   params.append('pattern', patternId.toString());
    // }
    params['year'] = year;
    params['month'] = month + 1;

    if (patternId > 0) {
      params['pattern'] = patternId;
    }
    return params;
  }
}
