import { SaveIncomingShipment } from './../models/SaveIncomingShipment';
import { IncomingShipment } from './../models/IncomingShipment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { incomingSortCheckBox } from '../pages/shipments/incoming-shipments/incoming-shipments.component';

@Injectable()
export class IncomingShipmentService {



    private incomingShipmentUrl = environment.APIURL + "/shipment/incoming/";
    constructor(private http: HttpClient) {

    }

    getShipments(checkBox: incomingSortCheckBox) {
        return this.http.get<IncomingShipment[]>
            (this.incomingShipmentUrl + "?notConfirmed=" + checkBox.notConfirmed + "&&?notInStock=" + checkBox.notInStock + "&&?arrived=" + checkBox.arrived);
    }
    getArrivedShipments() {
        return this.http.get<IncomingShipment[]>(this.incomingShipmentUrl + 'arrived/');
    }

    addShipment(shipment: SaveIncomingShipment[]) {
        console.log(shipment)
        return this.http.post<SaveIncomingShipment>(this.incomingShipmentUrl, shipment);
    }
    editShipment(shipment: SaveIncomingShipment) {
        console.log(shipment)
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
            incomingShipmentId: incomingShipmentId,
            arrival: false
        };
        return this.http.post<any>(this.incomingShipmentUrl + "arrival/", model);
    }
    backToUnConfirm(incomingShipmentId: number) {
        const model = {
            incomingShipmentId: incomingShipmentId,
            confirm: false
        };
        return this.http.post<any>(this.incomingShipmentUrl + "confirm/", model);
    }
    getShipmentById(id: number) {
        return this.http.get<IncomingShipment>(this.incomingShipmentUrl + id);
    }
}

export class ArrivalShipment {
    incomingShipmentId: number;
    arrival: true;
}