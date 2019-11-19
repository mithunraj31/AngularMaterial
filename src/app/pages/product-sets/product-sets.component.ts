import { AddProductSetDialogComponent } from './../../dialogs/add-product-set-dialog/add-product-set-dialog.component';
import { ProductSet } from './../../models/ProductSet';
import { ProductService } from './../../services/ProductService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';
import { Product } from 'src/app/models/Product';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-product-sets',
  templateUrl: './product-sets.component.html',
  styleUrls: ['./product-sets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),]
})
export class ProductSetsComponent implements OnInit {
  columnsToDisplay: string[] = [
    'productName',
    'description',
    'price',
    'quantity',
    'leadTime',
    'moq',
    'obicNo',
    'actions'
  ];

  dataSource = new MatTableDataSource<Product>();
  productSets: ProductSet[];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedElement: ProductSet | null;
  constructor(private productService: ProductService,public dialog: MatDialog,) { }

  ngOnInit() {
    this.productService.getProductSets().subscribe(result=>{
      this.productSets = result;
      console.log(this.productSets);
      this.dataSource.data = this.productSets;
      this.dataSource.paginator = this.paginator;
    })
  }

  deleteProduct(i: any) {
    console.log(this.productSets.indexOf(i));
    this.productSets.splice(this.productSets.indexOf(i),1);
    this.dataSource.data = this.productSets;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductSetDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
       
        // change concat to replace when using real api
        // this.products.push(product);
        // this.dataSource.data = this.products;
        console.log(result);
      }
    });
  }

}
