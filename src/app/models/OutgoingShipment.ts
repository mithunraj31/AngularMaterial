import { ProductComponent } from './ProductComponent';
import { User } from './User';
import { Customer } from './Customer';

export interface OutgoingShipment {
    outgoingShipmentId: number;
    shipmentNo: string;
    shipmentDate: Date;
    salesDestination: Customer
    createdAt?: Date;
    updatedAt?: Date;
    products?: ProductComponent[];
    user:User
}