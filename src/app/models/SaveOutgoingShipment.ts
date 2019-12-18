import { User } from './User';
import { Customer } from './Customer';
import { SaveProductComponent } from './saveProductComponent';

export interface SaveOutgoingShipment {
    outgoingShipmentId: number;
    shipmentNo: string;
    shipmentDate: string;
    salesDestination: Customer
    createdAt?: Date;
    updatedAt?: Date;
    products?: SaveProductComponent[];
    user:User
}