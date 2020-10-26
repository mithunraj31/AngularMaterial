import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';
import { ProductComponent } from '../models/ProductComponent';

@Pipe({
  name: 'productFilterQuery',
  pure: false
})
export class productFilterQuery implements PipeTransform {

  transform(products: ProductComponent[], query: string) {
    if (!products || products.length == 0) {
      return [];
    }

    if (!query || query.length == 0) {
      return products;
    }
    let filter = query.toLowerCase();
    return products.filter(option => option.product.productName.toLowerCase().includes(filter));
  }

}
