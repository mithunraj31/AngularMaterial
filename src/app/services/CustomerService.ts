import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/Customer';

@Injectable()
export class CustomerService {

    private getCustomerUrl = "assets/data/customers.json";
    constructor(private http: HttpClient){
        
    }

    getCustomers() {
        return this.http.get<Customer[]>(this.getCustomerUrl);
    }

}