import { ProductComponent } from './ProductComponent';
import { Product } from './Product';

export interface ProductSet extends Product{
    products: ProductComponent[],
}