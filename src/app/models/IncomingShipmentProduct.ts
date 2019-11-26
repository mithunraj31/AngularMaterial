import { Product } from './Product';
export interface IncomingShipmentProduct {
    product: Product;
    quantity: number;
    price: number;
}