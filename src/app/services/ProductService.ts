import { SaveProductSet } from './../models/saveProductSet';
import { environment } from './../../environments/environment';
import { ProductSet } from './../models/ProductSet';
import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SchedulePattern } from '../models/SchedulePattern';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/AuthService';


@Injectable()
export class ProductService {

    private productUrl = environment.APIURL + "/product/";
    private productSetUrl = environment.APIURL + "/productset/";
    private schedulePatternUrl = environment.APIURL + "/schedule/pattern/";

    constructor(private http: HttpClient, private authService: AuthService) {

    }

    getProducts() {
        return this.http.get<Product[]>(this.productUrl);
    }

    /**
     * Get product set with product items
     * @param includeIndividualSet fact use to retrive product set with individual set (optianal)
     */
    getProductSets(includeIndividualSet: boolean = false) {
      if (includeIndividualSet) {
        const observable = this.http.get<ProductSet[]>(`${this.productSetUrl}all`).pipe(map(x => {
          return x.map(s => {
            s.display = false;
            s.products = s.products.map(p => {
              p.product.display = false;
              return p;
            });
            return s;
          });
        }));

        return observable;
      }
      return this.http.get<ProductSet[]>(this.productSetUrl);
    }

    saveProduct(product: Product) {
        return this.http.post<Product>(this.productUrl, product);
    }

    updateProduct(product: Product) {
        return this.http.put<Product>(this.productUrl + product.productId, product);
    }

    deleteProduct(id: number) {
        return this.http.delete<Product>(this.productUrl + id);
    }

    addProductSet(saveProductSet: SaveProductSet) {
        return this.http.post<SaveProductSet>(this.productSetUrl, saveProductSet);
    }

    deleteProductSet(id: number) {
        return this.http.delete<SaveProductSet>(this.productSetUrl + id);
    }

    editProductSet(productSet: SaveProductSet) {
        return this.http.put<SaveProductSet>(this.productSetUrl + productSet.productId, productSet);
    }

    getProductById(id: number) {
        return this.http.get<Product>(this.productUrl + id);
    }
    getProductSetById(id: number) {
        return this.http.get<ProductSet>(this.productSetUrl + id);
    }
    getProductHistory(date:Date){
        return this.http.get<Product[]>(this.productUrl+"history/"+date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate());
    }

    /**
     * store schedule pattern data from user to use filter some item in schedule page.
     * @param pattern schedule pattern object.
     */
    saveSchedulePattern(pattern: SchedulePattern) {
      return this.http.post(this.schedulePatternUrl, pattern);
    }

    /**
     * update existing schedule pattern data
     * @param pattern schedule pattern object.
     */
    updateSchedulePattern(pattern: SchedulePattern) {
      return this.http.put(`${this.schedulePatternUrl}${pattern.schedulePatternId}`, pattern);
    }

    /**
     * Get all schedule patterns
     * @param includePrivate fact to retrive private item. (optional)
     */
    getSchedulePatterns(includePrivate: boolean = false) {
      if (includePrivate) {
        return this.http.get<SchedulePattern[]>(this.schedulePatternUrl);
      }
      const userId = this.authService.getUserId();
      return this.http.get<SchedulePattern[]>(this.schedulePatternUrl).pipe(map(x => {
        return x.filter(p => userId == p.createdUser.userId || !p.isPrivate);
      }));
    }

    /**
     * Get one schedule pattern by pattern ID
     * @param patternId schedule pattern's ID
     */
    getSchedulePatternById(patternId: number) {
      return this.http.get<SchedulePattern>(`${this.schedulePatternUrl}${patternId}`);
    }

    /**
     * Delete schedule pattern by pattern ID
     * @param patternId schedule pattern's ID
     */
    deleteSchedulePatternById(patternId: number) {
      return this.http.delete(`${this.schedulePatternUrl}${patternId}`);
    }

    /**
     * save selected pattern Id in localstorage
     * @param patternId Schedule pattern ID
     */
    setSchedulePatternToLocalStorage(patternId: number) {
      localStorage.setItem('schedule_pattern_id', patternId.toString());
    }

    /**
     * Get schedule pattern Id from localStorage
     */
    getSchedulePatternIdFromLocalStorage() : number {
      const patternId: string = localStorage.getItem('schedule_pattern_id');
      if (!patternId) {
        return 0;
      }
      return parseInt(patternId);
    }

}
