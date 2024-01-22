import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AdminComponent } from './admin';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { TrackerComponent } from './tracker/tracker.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { PackageComponent } from './package/package.component';
import { DriverComponent } from './driver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'driver',
    component: DriverComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Driver] }
  },
  {
    path: 'tracker',
    component: TrackerComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Driver, Role.User], }
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Driver, Role.User], }
  },
  {
    path: 'package',
    component: PackageComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.User], }
  },
  {
    path: 'login',
    component: LoginComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
