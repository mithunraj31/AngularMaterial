import { OrderService } from './services/OrderService';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Material imports
import {MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTableModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTabsModule,
        MatSelectModule,
        MatExpansionModule,
        MatBadgeModule,
        
} from '@angular/material';

import { SidebarComponent } from './components/sidebar/sidebar.component'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component'; 
import { ProductService } from './services/ProductService';
import { AddProductDialogComponent } from './dialogs/add-product-dialog/add-product-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProductDialogComponent } from './dialogs/update-product-dialog/update-product-dialog.component';
import { ProductSetsComponent } from './pages/product-sets/product-sets.component';
import { ProductsContainerComponent } from './pages/products-container/products-container.component';
import { AddProductSetDialogComponent } from './dialogs/add-product-set-dialog/add-product-set-dialog.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { EditProductSetDialogComponent } from './dialogs/edit-product-set-dialog/edit-product-set-dialog.component';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CustomerService } from './services/CustomerService';
import { AddCustomerComponent } from './dialogs/add-customer/add-customer.component';
import { EditCustomerDialogComponent } from './dialogs/edit-customer-dialog/edit-customer-dialog.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ViewCustomerDialogComponent } from './dialogs/view-customer-dialog/view-customer-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    ProductsComponent,
    AddProductDialogComponent,
    UpdateProductDialogComponent,
    ProductSetsComponent,
    ProductsContainerComponent,
    AddProductSetDialogComponent,
    EditProductSetDialogComponent,
    DeleteConfirmationDialogComponent,
    CustomersComponent,
    AddCustomerComponent,
    EditCustomerDialogComponent,
    OrdersComponent,
    ViewCustomerDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSelectModule,
    ScrollingModule,
    MatExpansionModule,
    MatBadgeModule
  ],
  exports: [ 
     
  ],
  entryComponents: [
    AddProductDialogComponent,
    UpdateProductDialogComponent,
    AddProductSetDialogComponent,
    EditProductSetDialogComponent,
    DeleteConfirmationDialogComponent,
    AddCustomerComponent,
    EditCustomerDialogComponent,
    ViewCustomerDialogComponent
  ],
  providers: [
    ProductService,
    CustomerService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
