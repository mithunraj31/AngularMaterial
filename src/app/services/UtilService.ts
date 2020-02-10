import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {

    constructor() {

    }

    getCurrencySign(currency: string): string {
        switch (currency) {
            case "JPY":
                return "¥";
                break;
            case "USD":
                return "$";
                break;            
            default:
                return "¥";
                break;
        }
    }

}