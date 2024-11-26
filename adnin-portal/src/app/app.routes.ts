import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { DashboardComponent } from './pages/dashboard-page/dashboard/dashboard.component';
import { DriversTableDataComponent } from './pages/drivers-page/drivers-table-data/drivers-table-data.component';
import { ClientsComponent } from './pages/clients-page/clients/clients.component';
import { OrganizationComponent } from './pages/organization/organization/organization.component';
import { RevenueComponent } from './pages/revenue-page/revenue/revenue.component';
import { FeedbackComponent } from './pages/feedback-page/feedback/feedback.component';
import { GeographyComponent } from './pages/geograpy-page/geography/geography.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products-page/products/products.component';
import { NavbarComponent } from './shared/reusable-components/navbar/navbar.component';
import { SettingsComponent } from './pages/settings-page/settings/settings.component';
import { LayoutComponent } from './component/layout/layout.component';
import { ClientDetailsComponent } from './pages/clients-page/client-details/client-details.component';
import { DriverDetailComponent } from './pages/drivers-page/driver-detail/driver-detail.component';
import { VehicleTypesandPricesComponent } from './pages/products-page/vehicle-typesand-prices/vehicle-typesand-prices.component';
import { RideHistoryComponent } from './pages/ride-history/ride-history.component';

export const routes: Routes = [
  // default path
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // Routes with layout
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'drivers',
        component: DriversTableDataComponent ,
        // canActivate: [authGuard],
      },
      {
        path: 'clients',
        component: ClientsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'organizations',
        component: OrganizationComponent,
        canActivate: [authGuard],
      },
      {
        path: 'revenue',
        component: RevenueComponent,
        canActivate: [authGuard],
      },
      {
        path: 'ridehistory',
        component: RideHistoryComponent,
        canActivate: [authGuard],
      },
      {
        path: 'geography',
        component: GeographyComponent,
        canActivate: [authGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard],
      },
      { path: 'logout', component: NavbarComponent, canActivate: [authGuard] },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [authGuard],
      },
      {
        path:'client/:id' ,
        component:ClientDetailsComponent,
        canActivate:[authGuard]
      },{
        path:'driver/:id',
        component:DriverDetailComponent,
        canActivate:[authGuard]
      },{
        path:'products/:serviceName',
        component:VehicleTypesandPricesComponent,
        canActivate:[authGuard]
      }

    ],
  },

  { path: 'login', component: LoginComponent },
];
