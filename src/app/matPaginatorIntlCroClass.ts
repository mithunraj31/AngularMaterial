import { MatPaginatorIntl } from '@angular/material';
import { Inject, LOCALE_ID, Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
    constructor(@Inject(LOCALE_ID) public localeId: string) {
        super();
        console.log(this.localeId);
    }
    itemsPerPageLabel = this.localeId=="en"?'Items per page':this.localeId=="ja"?'1ページの商品数':'Items per page';
    nextPageLabel = this.localeId=="en"?'Next page':this.localeId=="ja"?'次のページ':'Next page';
    previousPageLabel = this.localeId=="en"?'Previous page':this.localeId=="ja"?'前のページ':'Previous page';
    firstPageLabel = this.localeId=="en"?'First page':this.localeId=="ja"?'一ページ目':'First page';
    lastPageLabel = this.localeId=="en"?'Last page':this.localeId=="ja"?'最後のページ':'Last page';

    getRangeLabel = (page, pageSize, length) => {
        if (length === 0 || pageSize === 0) {
            if(this.localeId=="en"){
                return '0 ' + 'of ' + length;
            }else if (this.localeId=="ja"){
                return '0 件中 0 件を表示';
            }
            return '0 ' + 'of ' + length;
            // return '0 '+(this.localeId=="en"?'of':this.localeId=="ja"?'の':'of') + ' '+ length;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ?
            Math.min(startIndex + pageSize, length) :
            startIndex + pageSize;

        if(this.localeId=="en"){
                return startIndex + 1 + ' - ' + endIndex +'of'+ length;
        }else if (this.localeId=="ja"){
                return length+ ' 件中 ' + (startIndex + 1) + ' - ' + endIndex+' 件を表示';
        }
        return startIndex + 1 + ' - ' + endIndex + (this.localeId=="en"?'of':this.localeId=="ja"?'の':'of') + length;
    };
}