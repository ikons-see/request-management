import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequesterComponent } from './pages/requester/requester.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'requester', pathMatch: 'full'},
      {path: 'requester', component: RequesterComponent}
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
