import { User } from './User';
import { SaveShipmentProduct } from './SaveShipmentProduct';
export interface SaveIncomingShipment {
    incomingShipmentId: number;
    shipmentNo: string;
    arrivalDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    products?: SaveShipmentProduct[];
    user: User
}