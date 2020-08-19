import { UtilService } from './UtilService';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { DatePipe } from '@angular/common';
import { Product } from '../models/Product';

@Injectable({
    providedIn: 'root'
})
export class ExcelServices {

    constructor(private datePipe: DatePipe, private util: UtilService) {

    }
    async generateExcel(data: Product[], requestedDate: Date) {


        // const ExcelJS = await import('exceljs');
        // console.log(ExcelJS);
        // const Workbook: any = {};

        // Excel Title, Header, Data
        const title = 'MBEL FORKERS 生産販売管理システム';
        const subTitle = '製品 / Products';
        // const header = [ 'OBIC番号 / OBIC No','製品名 / Product Name','製品名 / Description','単価 / Price','現在庫 / Current Stock', 'MOQ'];
        const header = ['OBIC番号', '製品名', '製品内容', '単価', '現在庫', 'リードタイム (w)', 'MOQ'];


        // Create workbook and worksheet
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('製品');


        // Add Row and formatting
        const titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
        worksheet.addRow([]);
        worksheet.getCell('A1').fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF5E92F3' },
            bgColor: { argb: 'FF5E92F3', }
        };
        const subTitleRow = worksheet.addRow([subTitle]);
        const dateRow = worksheet.addRow(['Date : ' + this.datePipe.transform(requestedDate, 'mediumDate')+' 12:00 AM']);
        worksheet.mergeCells('A1:D2');
        worksheet.mergeCells('A3:C3');
        worksheet.mergeCells('A4:C4');

        // Blank Row()
        worksheet.addRow([]);

        // Add Header Row
        const headerRow = worksheet.addRow(header);

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, number) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF1565C0' },
                bgColor: { argb: 'FF1565C0', }
            };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.font = { color: { argb: 'ffffff' } };
        });
        // worksheet.addRows(data);


        // Add Data and Conditional Formatting
        data.forEach(d => {
            const row = worksheet.addRow([
                d.obicNo,
                d.productName,
                d.description,
                (this.util.getCurrencySign(d.currency) + '' + d.price),
                d.quantity,
                d.leadTime,
                d.moq
            ]);
            // const qty = row.getCell(5);
            // let color = 'FF99FF99';
            // if (+qty.value < 500) {
            //     color = 'FF9999';
            // }

            // qty.fill = {
            //     type: 'pattern',
            //     pattern: 'solid',
            //     fgColor: { argb: color }
            // };
        }

        );
        worksheet.getColumn(1).width = 15;
        worksheet.getColumn(2).width = 30;
        worksheet.getColumn(3).width = 30;
        worksheet.getColumn(4).width = 15;
        worksheet.addRow([]);


        // // Footer Row
        // const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
        // footerRow.getCell(1).fill = {
        //     type: 'pattern',
        //     pattern: 'solid',
        //     fgColor: { argb: 'FFCCFFE5' }
        // };
        // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

        // // Merge Cells
        // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data: any) => {

            const fileName = '製品 ' + this.datePipe.transform(requestedDate, 'yyyyMMddHHmm') + '.xlsx';
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, fileName);
        });

    }
}


