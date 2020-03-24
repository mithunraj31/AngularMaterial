import { User } from './User';
import { SaveShipmentProduct } from './SaveShipmentProduct';
export interface SaveIncomingShipment {
    incomingShipmentId: number;
    shipmentNo: string;
    branch:string;
    vendor:string;
    orderDate: string;
    pendingQty: number;
    fixedDeliveryDate: string;
    desiredDeliveryDate: string;
    productId: number;
    quantity: number;
    confirmedQty: number;
    price: number;
    currency?: string;
    partial: boolean;
    fixed: boolean;
}