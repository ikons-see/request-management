import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './endpoint/guards/authentication.guard';
import { LoginComponent } from './pages/login/login.component';
import { RequesterComponent } from './pages/requester/requester.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'app',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'app',
    children: [
      {path: '', redirectTo: 'requester', pathMatch: 'full'},
      {path: 'requester', component: RequesterComponent, canActivate: [AuthenticationGuard]}
    ],
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
