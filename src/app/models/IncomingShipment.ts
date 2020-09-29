import { Product } from 'src/app/models/Product';
import { User } from './User';

export interface IncomingShipment {
    editReason?: string;
    incomingShipmentId: number;
    shipmentNo: string;
    branch?: string;
    vendor?: string;
    orderDate: string;
    fixedDeliveryDate?: string;
    desiredDeliveryDate?: string;
    createdAt?: Date;
    updatedAt?: Date;
    product: Product;
    pendingQty?: number;
    confirmedQty?: number;
    quantity?: number;
    currency?: string;
    price: number;
    arrived: boolean;
    fixed: boolean;
    partial: boolean;
    user: User;

}
