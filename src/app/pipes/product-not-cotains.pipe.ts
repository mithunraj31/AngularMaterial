import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';
import { SaveProductComponent } from '../models/saveProductComponent';

@Pipe({
  name: 'productNototCotains',
  pure: false
})
export class ProductNotCotainsPipe implements PipeTransform {

  transform(products: Product[], savedProducts: SaveProductComponent[]): Product[] {
    if (!products || products.length == 0) {
      return [];
    }

    if (!savedProducts || savedProducts.length == 0) {
      return products;
    }

    const savedProductIds = savedProducts.map(x => x.productId);
    return products.filter(x => !savedProductIds.includes(x.productId));
  }

}
