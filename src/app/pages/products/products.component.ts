import { UtilService } from './../../services/UtilService';
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
  constructor(
    public dialog: MatDialog,
    public productService: ProductService,
    public util: UtilService) { }

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
        },error=>{
          this.progress = false;
        })
      
      }
    });
  }

  editProduct(i: any) {
    const data =this.products[this.products.indexOf(i)];
    console.log(this.products[i]);
    const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
      width: '600px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      
      console.log('The dialog was closed');
      if (result) {
        this.progress = true;
        const product: Product = result;
        product.productId = data.productId;
        // change concat to replace when using real api
        this.productService.updateProduct(product).subscribe((result)=>{
          this.getProductData();
        },error=>{
          this.progress = false;
        })
        
      }
    });
  }

  deleteProduct(i: any) {
    const data = this.products[this.products.indexOf(i)]
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '600px',
      data: data.productName
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.progress = true;
        this.productService.deleteProduct(data.productId).subscribe(result=>{
          this.getProductData();
        },error=>{
          this.progress = false;
        })
      }
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
