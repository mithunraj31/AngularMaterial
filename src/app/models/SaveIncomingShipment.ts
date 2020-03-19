import { User } from './User';
import { SaveShipmentProduct } from './SaveShipmentProduct';
export interface SaveIncomingShipment {
    incomingShipmentId: number;
    branch:string;
    vendor:string;
    orderDate: string;
    pendingQty: number;
    fixedDeliveryDate: string;
    desiredDeliveryDate: string;
    productId: string;
    quantity: number;
    confirmedQty: number;
    price: number;
    currency: number;
    partial: number;
    fixed: number;
}