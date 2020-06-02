import { SaveIncomingShipment } from './../models/SaveIncomingShipment';
import { IncomingShipment } from './../models/IncomingShipment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class IncomingShipmentService {



    private incomingShipmentUrl = environment.APIURL + "/shipment/incoming/";
    constructor(private http: HttpClient) {

    }

    getShipments() {
        return this.http.get<IncomingShipment[]>(this.incomingShipmentUrl);
    }
    getArrivedShipments() {
        return this.http.get<IncomingShipment[]>(this.incomingShipmentUrl + 'arrived/');
    }

    addShipment(shipment: SaveIncomingShipment[]) {
        return this.http.post<SaveIncomingShipment>(this.incomingShipmentUrl, shipment);
    }
    editShipment(shipment: SaveIncomingShipment) {
        return this.http.put<SaveIncomingShipment>(this.incomingShipmentUrl + shipment.incomingShipmentId, shipment);
    }
    deleteShipment(incomingShipmentId: number) {
        return this.http.delete<any>(this.incomingShipmentUrl + incomingShipmentId);
    }
    arrivalOrder(incomingShipmentId: number) {
        const data: ArrivalShipment = {
            incomingShipmentId: incomingShipmentId,
            arrival: true
        }
        return this.http.post<ArrivalShipment>(this.incomingShipmentUrl + "arrival/", data);
    }
    backToConfirm(incomingShipmentId: number) {
        const model = {
            incomingShipmentId : incomingShipmentId,
            arrival : false
        };
        return this.http.post<any>(this.incomingShipmentUrl + "arrival/", model);
    }
    backToUnConfirm(incomingShipmentId: number) {
        const model = {
            incomingShipmentId : incomingShipmentId,
            confirm : false
        };
        return this.http.post<any>(this.incomingShipmentUrl + "confirm/", model);
    }
}

export class ArrivalShipment {
    incomingShipmentId: number;
    arrival: true;
}