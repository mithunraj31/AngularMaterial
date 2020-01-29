import { OrderedProduct } from './OrderedProduct';
import { Customer } from 'src/app/models/Customer';
import { User } from './User';
export interface Order {
    orderId: number;
    dueDate: Date;
    customer: Customer;
    salesDestination: Customer;
    contractor: Customer;
    receivedDate: Date;
    proposalNo: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    salesUser: User;
    editReason: string;
    active: boolean;
    forecast: boolean;
    fulfilled: boolean;
    orderedProducts: OrderedProduct[];
}