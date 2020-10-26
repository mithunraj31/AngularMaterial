import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/Product';
import { ProductComponent } from '../models/ProductComponent';
import { ProductSet } from '../models/ProductSet';

@Pipe({
  name: 'productSetFilterQuery',
  pure: false
})
export class productSetFilterQuery implements PipeTransform {

  transform(products: ProductSet[], query: string) {
    if (!products || products.length == 0) {
      return [];
    }

    if (!query || query.length == 0) {
      return products;
    }
    let filter = query.toLowerCase();
    return products.filter(option => option.productName.toLowerCase().includes(filter));
  }

}
