import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { Customer } from './Customer';
import { User } from './User';

export interface SaveOrder {
    orderId: number;
    dueDate: Date;
    customerId: number;
    salesDestinationId: number;
    contractorId: number;
    recievedDate: Date;
    proposalNo: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    salesUserId: User;
    editReason: string;
    active: boolean;
    forcast: boolean;
    orderedProducts: SaveProductComponent[];
}