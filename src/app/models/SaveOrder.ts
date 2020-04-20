import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { Customer } from './Customer';
import { User } from './User';

export interface SaveOrder {
    orderId: number;
    dueDate: string;
    deliveryDate: string;
    customerId: number;
    salesDestinationId: number;
    contractorId: number;
    receivedDate: string;
    proposalNo: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    salesUserId: number;
    editReason: string;
    active: boolean;
    forcast: boolean;
    orderedProducts: SaveProductComponent[];
    fixed: boolean;
    
}