import { SaveIncomingShipment } from './../models/SaveIncomingShipment';
import { IncomingShipment } from './../models/IncomingShipment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class IncomingShipmentService {


    private incomingShipmentUrl = environment.APIURL + "/shipment/incoming/";
    constructor(private http: HttpClient){
        
    }

    getShipments() {
        return this.http.get<IncomingShipment[]>(this.incomingShipmentUrl);
    }

    addShipment(shipment:SaveIncomingShipment){
        return this.http.post<SaveIncomingShipment>(this.incomingShipmentUrl,shipment);
    }
    editShipment(shipment:SaveIncomingShipment){
        return this.http.put<SaveIncomingShipment>(this.incomingShipmentUrl+shipment.incomingShipmentId,shipment);
    }
    deleteShipment(incomingShipmentId: number) {
        return this.http.delete<any>(this.incomingShipmentUrl+incomingShipmentId);
      }
}