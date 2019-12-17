import { SaveOutgoingShipment } from './../models/SaveOutgoingShipment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OutgoingShipment } from '../models/OutgoingShipment';

@Injectable()
export class OutgoingShipmentService {


    private outgoingShipmentUrl = environment.APIURL + "/shipment/outgoing/";
    // private outgoingShipmentUrl = "/assets/data/outgoingShipments.json"
    constructor(private http: HttpClient){
        
    }

    getShipments() {
        return this.http.get<OutgoingShipment[]>(this.outgoingShipmentUrl);
    }

    addShipment(shipment:SaveOutgoingShipment){
        return this.http.post<SaveOutgoingShipment>(this.outgoingShipmentUrl,shipment);
    }
    editShipment(shipment:SaveOutgoingShipment){
        return this.http.put<SaveOutgoingShipment>(this.outgoingShipmentUrl+shipment.outgoingShipmentId,shipment);
    }
    deleteShipment(incomingShipmentId: number) {
        return this.http.delete<any>(this.outgoingShipmentUrl+incomingShipmentId);
      }
}