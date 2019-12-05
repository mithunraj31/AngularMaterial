import { SaveIncomingShipment } from './../models/SaveIncomingShipment';
import { IncomingShipment } from './../models/IncomingShipment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IncomingShipmentService {


    private incomingShipmentUrl = "assets/data/IncomingShipments.json";
    constructor(private http: HttpClient){
        
    }

    getShipments() {
        return this.http.get<IncomingShipment[]>(this.incomingShipmentUrl);
    }

    addShipment(shipment:SaveIncomingShipment){
        return this.http.post<SaveIncomingShipment>(this.incomingShipmentUrl,shipment);
    }
    deleteShipment(incomingShipmentId: number) {
        return this.http.delete<any>(this.incomingShipmentUrl+incomingShipmentId);
      }
}