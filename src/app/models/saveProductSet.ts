import { Product } from './Product';
import { SaveProductComponent } from './saveProductComponent';

export interface SaveProductSet extends Product{
    products: SaveProductComponent[];
}