import { MyPageComponent } from './pages/my-page/my-page.component';
import { LoginComponent } from './pages/login/login.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { OrdersContainerComponent } from './pages/orders/orders-container.component';
import { ProductsContainerComponent } from './pages/products-container/products-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { AuthGuardService as AuthGuard } from "./auth/AuthGuardService";
import { ForcastComponent } from './pages/forcast/forcast.component';
import { DeliveryScheduleComponent } from './pages/delivery-schedule/delivery-schedule.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products', component: ProductsContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customers', component: CustomersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/:fulfilled/:id', component: OrdersContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders/:id', component: OrdersContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'orders', component: OrdersContainerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shipments/:arrived/:id', component: ShipmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shipments/:id', component: ShipmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shipments', component: ShipmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent,
    
  },
  {
    path: 'forecast', component: ForcastComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mypage', component: MyPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'delivery-schedule', component: ScheduleComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
