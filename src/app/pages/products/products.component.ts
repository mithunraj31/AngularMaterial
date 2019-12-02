import { DeleteConfirmationDialogComponent } from './../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProductService } from './../../services/ProductService';
import { AddProductDialogComponent } from './../../dialogs/add-product-dialog/add-product-dialog.component';
import { Product } from './../../models/Product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTable, MatPaginator, MatTableDataSource } from '@angular/material';
import { UpdateProductDialogComponent } from 'src/app/dialogs/update-product-dialog/update-product-dialog.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'description',
    'price',
    'qty',
    'leadTime',
    'moq',
    'obicNo',
    'actions'
  ];
  products: Product[] = [];
  productName: string;
  dataSource = new MatTableDataSource<Product>();
  progress=false;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public dialog: MatDialog, public productService: ProductService) { }

  ngOnInit() {
    this.getProductData();
    this.dataSource.paginator = this.paginator;
  }
  getProductData() {
    this.progress = true;
    this.productService.getProducts().subscribe(result => {
      console.log(result);
      this.products = result;
      this.dataSource.data = this.products;
      this.progress = false;
    }, error=>{
      this.progress = false;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const product: Product = result;

        // API Requst to save product
        this.progress = true;
        this.productService.saveProduct(product).subscribe(result => {
          this.getProductData();
          console.log(result);
          this.progress = false;
        },error=>{
          this.progress = false;
        })
      
      }
    });
  }

  editProduct(i: any) {
    console.log(this.products[i]);
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '600px',
      data: this.products[this.products.indexOf(i)]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        const product: Product = result;
        // change concat to replace when using real api
        this.products[this.products.indexOf(i)] = product;
        this.dataSource.data = this.products;
        console.log(product);
      }
    });
  }

  deleteProduct(i: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: this.products[this.products.indexOf(i)].productName
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(this.products.indexOf(i));
        this.products.splice(this.products.indexOf(i), 1);
        this.dataSource.data = this.products;
      }
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
