import { ProductSet } from './ProductSet';
export interface OrderedProduct {
    product: ProductSet;
    quantity: number;
    currentQuantity?: number;
    mod?: string;
}