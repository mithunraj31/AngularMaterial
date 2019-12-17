import { User } from './User';
import { Customer } from './Customer';
import { SaveProductComponent } from './saveProductComponent';

export interface SaveOutgoingShipment {
    outgoingShipmentId: number;
    shipmentNo: string;
    shipmentDate: Date;
    salesDestination: Customer
    createdAt?: Date;
    updatedAt?: Date;
    products?: SaveProductComponent[];
    user:User
}