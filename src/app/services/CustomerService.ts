import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/Customer';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomerService {

    private customerUrl = environment.APIURL + "/customer/";
    constructor(private http: HttpClient) {

    }

    getCustomers() {
        return this.http.get<Customer[]>(this.customerUrl);
    }

    addCustomer(customer: Customer) {
        return this.http.post<Customer>(this.customerUrl, customer);
    }

    editCustomer(customer: Customer) {
        return this.http.put<Customer>(this.customerUrl + customer.customerId, customer);
    }

    deleteCustomer(id: number) {
        return this.http.delete<Customer>(this.customerUrl+id);
    }

}