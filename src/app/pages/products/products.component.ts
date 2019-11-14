import { ProductService } from './../../services/ProductService';
import { AddProductDialogComponent } from './../../dialogs/add-product-dialog/add-product-dialog.component';
import { Product } from './../../models/Product';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';


const products: Product[] = [
  { product_name: "test product", description: "tes description", price: 300, qty: 5 }
];
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
    'actions'
  ];
  data: Product[] = products;
  productName: string;
  constructor(public dialog: MatDialog, public productService: ProductService) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result){
        
        this.productName = result.name;
      }
    });
  }
}
