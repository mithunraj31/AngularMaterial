import { IncomingShipmentProduct } from './IncomingShipmentProduct';
import { User } from './User';

export interface IncomingShipment {
    incomingShipmentId: number;
    shipmentNo: string;
    arrivalDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    products?: IncomingShipmentProduct[];
    user:User
}