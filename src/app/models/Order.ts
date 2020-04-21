import { OrderedProduct } from './OrderedProduct';
import { Customer } from 'src/app/models/Customer';
import { User } from './User';
export interface Order {
    orderId: number;
    dueDate: string;
    deliveryDate: string;
    customer: Customer;
    salesDestination: Customer;
    contractor: Customer;
    receivedDate: string;
    proposalNo: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    salesUser: User;
    editReason: string;
    active: boolean;
    forecast: boolean;
    fulfilled: boolean;
    orderedProducts: OrderedProduct[];
    fixed: boolean;
}