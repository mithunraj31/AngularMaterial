import { SaveProductComponent } from 'src/app/models/saveProductComponent';
import { Customer } from './Customer';
import { User } from './User';

export interface Order {
    orderId: number;
    dueDate: Date;
    customer: Customer;
    salesDestination: Customer;
    contractor: Customer;
    recievedDate: Date;
    proposalNo: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    salesUser: User;
    editReason: string;
    active: boolean;
    forcast: boolean;
    orderedProducts: SaveProductComponent[];
}