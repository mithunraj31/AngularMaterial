import { ForecastService } from './services/ForecastService';
import { AuthService } from 'src/app/auth/AuthService';
import { IncomingShipmentService } from './services/IncomingShipmentService';
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
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatPaginatorIntl,
        MatSnackBarModule,
        
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
import { AddOrderDialogComponent } from './dialogs/add-order-dialog/add-order-dialog.component';
import { EditOrderDialogComponent } from './dialogs/edit-order-dialog/edit-order-dialog.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { IncomingShipmentsComponent } from './pages/shipments/incoming-shipments/incoming-shipments.component';
import { OutgoingShipmentsComponent } from './pages/shipments/outgoing-shipments/outgoing-shipments.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './auth/AuthGuardService';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddIncomingShipmentComponent } from './dialogs/add-incoming-shipment/add-incoming-shipment.component';
import { UserService } from './services/UserService';
import { MatPaginatorIntlCro } from './matPaginatorIntlCroClass';
import { EditIncomingShipmentComponent } from './dialogs/edit-incoming-shipment/edit-incoming-shipment.component';
import { OutgoingShipmentService } from './services/OutgoingShipmentService';
import { AddOutgoingShipmentComponent } from './dialogs/add-outgoing-shipment/add-outgoing-shipment.component';
import { EditOutgoingShipmentComponent } from './dialogs/edit-outgoing-shipment/edit-outgoing-shipment.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ForcastComponent } from './pages/forcast/forcast.component';
import { FulfillOrderDialogComponent } from './dialogs/fulfill-order-dialog/fulfill-order-dialog.component';
import { ForecastDialogComponent } from './dialogs/forecast-dialog/forecast-dialog.component';
import { ArrivalOrderDialogComponent } from './dialogs/arrival-order-dialog/arrival-order-dialog.component';
import { MyPageComponent } from './pages/my-page/my-page.component';


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
    AddOrderDialogComponent,
    EditOrderDialogComponent,
    ShipmentsComponent,
    IncomingShipmentsComponent,
    OutgoingShipmentsComponent,
    LoginComponent,
    AddIncomingShipmentComponent,
    EditIncomingShipmentComponent,
    AddOutgoingShipmentComponent,
    EditOutgoingShipmentComponent,
    ForcastComponent,
    FulfillOrderDialogComponent,
    ForecastDialogComponent,
    ArrivalOrderDialogComponent,
    MyPageComponent,

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
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatGridListModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    MatSnackBarModule
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
    ViewCustomerDialogComponent,
    AddOrderDialogComponent,
    EditOrderDialogComponent,
    AddIncomingShipmentComponent,
    EditIncomingShipmentComponent,
    AddOutgoingShipmentComponent,
    EditOutgoingShipmentComponent,
    ForcastComponent,
    FulfillOrderDialogComponent,
    ForecastDialogComponent,
    ArrivalOrderDialogComponent
  ],
  providers: [
    ProductService,
    CustomerService,
    OrderService,
    IncomingShipmentService,
    AuthService,
    AuthGuardService,
    AuthInterceptorService,
    OutgoingShipmentService,
    UserService,
    ForecastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
