import { User } from './User';

export interface Product {
    productId?: number;
    productName:string;
    description: string;
    price: number;
    currency?: string;
    moq?: number;
    leadTime?: number;
    obicNo?: string;
    quantity: number;
    isSet?: boolean;
    active?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: number;
    color?: string;
    sort?: number;
    display?: boolean;
    user?: User;
    editReason?: string;
}