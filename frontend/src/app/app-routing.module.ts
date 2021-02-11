import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './endpoint/guards/authentication.guard';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { ChartsViewComponent } from './pages/administrator/charts-view/charts-view.component';
import { AdminRequestsComponent } from './pages/administrator/admin-requests/admin-requests.component';
import { AuthenticatedAppComponent } from './pages/authenticated-app/authenticated-app.component';
import { RequesterComponent } from './pages/requester/requester.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login/sign-up/sign-up.component';
import { LoginPageComponent } from './pages/login/login.component';
import { RouteAccessGuard } from './endpoint/guards/route-access.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    children: [
      { path: '', component: SignInComponent, pathMatch: 'full' },
      { path: 'register', component: SignUpComponent },
    ]
  },
  {
    path: 'app',
    component: AuthenticatedAppComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: '', redirectTo: 'requester', pathMatch: 'full' },
      { path: 'requester', component: RequesterComponent},
      {
        path: 'administrator', component: AdministratorComponent, children: [
          { path: '', redirectTo: 'requests', pathMatch: 'full' },
          { path: 'requests', component: AdminRequestsComponent },
          { path: 'charts', component: ChartsViewComponent }
        ]
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'app'
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
