import { Product } from 'src/app/models/Product';
import { ShipmentProduct } from './ShipmentProduct';
import { User } from './User';

export interface IncomingShipment {
    incomingShipmentId: number;
    shipmentNo: string;
    branch?:string;
    vendor?:string;
    orderDate: Date;
    fixedDeliveryDate?: Date;
    desiredDeliveryDate?: Date;
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
    user:User

}