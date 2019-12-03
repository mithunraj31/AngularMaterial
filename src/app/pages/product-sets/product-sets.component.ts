import { SaveProductSet } from './../../models/saveProductSet';
import { AddProductSetDialogComponent } from './../../dialogs/add-product-set-dialog/add-product-set-dialog.component';
import { ProductSet } from './../../models/ProductSet';
import { ProductService } from './../../services/ProductService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator, MatDialog } from '@angular/material';
import { Product } from 'src/app/models/Product';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { EditProductSetDialogComponent } from 'src/app/dialogs/edit-product-set-dialog/edit-product-set-dialog.component';
import { DeleteConfirmationDialogComponent } from 'src/app/dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-product-sets',
  templateUrl: './product-sets.component.html',
  styleUrls: ['./product-sets.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
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
  progress = false;
  dataSource = new MatTableDataSource<Product>();
  productSets: ProductSet[];
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  expandedElement: ProductSet | null;
  constructor(private productService: ProductService, public dialog: MatDialog, ) { }

  ngOnInit() {
    this.getProductSetData();
    this.dataSource.paginator = this.paginator;
  }

  getProductSetData() {
    this.progress = true;
    this.productService.getProductSets().subscribe(result => {
      this.productSets = result;
      console.log(this.productSets);
      this.dataSource.data = this.productSets;
      this.progress = false;
    }, error => {
      this.progress = false;
      console.log(error);
    })
  }
  deleteProduct(i: any) {
    const data = this.productSets[this.productSets.indexOf(i)];
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: data.productName
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.progress = true;
        this.productService.deleteProductSet(data.productId).subscribe(result => {
          this.getProductSetData();
          this.progress = false;

        }, error => {
          this.progress = true;
          console.log(error);
        })
      }
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductSetDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log(result);
      if (result) {
        this.progress = true;
        this.productService.addProductSet(result).subscribe(result => {
          this.getProductSetData();
          this.progress = false;
        }, error => {
          console.log(error);
          this.progress = false;
        })
      }
    });
  }
  editProductSet(data: ProductSet) {
    const dialogRef = this.dialog.open(EditProductSetDialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.progress=true;
        console.log(result);
        const productset: SaveProductSet = result;
        productset.productId=data.productId;
        this.productService.editProductSet(productset).subscribe(result=>{
          console.log(result);
          this.getProductSetData();
          this.progress=false;
        },error=>{
          this.progress=false;
        })
      }
    });
  }

}
