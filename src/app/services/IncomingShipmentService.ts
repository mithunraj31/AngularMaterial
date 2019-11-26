import { IncomingShipment } from './../models/IncomingShipment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IncomingShipmentService {

    private getIncomingShipmentUrl = "assets/data/IncomingShipments.json";
    constructor(private http: HttpClient){
        
    }

    getshipments() {
        return this.http.get<IncomingShipment[]>(this.getIncomingShipmentUrl);
    }

}