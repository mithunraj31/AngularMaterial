import * as tslib_1 from "tslib";
import { LoginComponent } from './pages/login/login.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsContainerComponent } from './pages/products-container/products-container.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AuthGuardService as AuthGuard } from "./auth/AuthGuardService";
const routes = [
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
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib_1.__decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map