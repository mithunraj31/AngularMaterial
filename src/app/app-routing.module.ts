import { LoginComponent } from './pages/login/login.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsContainerComponent } from './pages/products-container/products-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AuthGuardService as AuthGuard } from "./auth/AuthGuardService";

const routes: Routes = [
  { path: '', component: HomeComponent,
    canActivate: [AuthGuard] },
  {
    path: 'products', component: ProductsContainerComponent
  },
  { path: 'customers', component: CustomersComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'shipments', component: ShipmentsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
