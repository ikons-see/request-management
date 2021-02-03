import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RequesterComponent } from './pages/requester/requester.component';
import { NavigationTabComponent } from './components/navigation-bar/navigation-tab/navigation-tab.component';
import { PageComponent } from './components/page/page.component';
import { DropdownColumnComponent } from './components/table/dropdown-column/dropdown-column.component';
import { DefaultColumnComponent } from './components/table/default-column/default-column.component';
import { AddRequestModalComponent } from './pages/requester/add-request-modal/add-request-modal.component';
import { ViewDetailsModalComponent } from './pages/requester/view-details-modal/view-details-modal.component';
import { EditDetailsModalComponent } from './pages/requester/edit-details-modal/edit-details-modal.component';
import { DeleteDetailsModalComponent } from './pages/requester/delete-details-modal/delete-details-modal.component';

import * as requestsReducer from './store/requests-reducer';
import { RequestsManagementEffects } from './store/requests-effects';
import { PaginationComponent } from './page-utils/pagination/pagination.component';
import { DateColumnComponent } from './components/table/date-column/date-column.component';
import { LoadingViewComponent } from './page-utils/loading-view/loading-view.component';
import { ErrorViewComponent } from './page-utils/error-view/error-view.component';
import { EmptyPageComponent } from './page-utils/empty-page/empty-page.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RequestInfoComponent } from './pages/requester/view-details-modal/request-info/request-info.component';
import { RequestResourcesComponent } from './pages/requester/view-details-modal/request-resources/request-resources.component';
import { AddResourcesComponent } from './pages/requester/add-request-modal/add-resources/add-resources.component';
import { AddGeneralInfoComponent } from './pages/requester/add-request-modal/add-general-info/add-general-info.component';
import { EditGeneralInfoComponent } from './pages/requester/edit-details-modal/edit-general-info/edit-general-info.component';
import { EditResourcesComponent } from './pages/requester/edit-details-modal/edit-resources/edit-resources.component';

export interface ApplicationState {
  [requestsReducer.featureKey]: requestsReducer.State
}

const reducers: ActionReducerMap<ApplicationState> = {
  [requestsReducer.featureKey]: requestsReducer.reducer
}

const effects = [
  RequestsManagementEffects
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ModalComponent,
    TableComponent,
    LoginComponent,
    RequesterComponent,
    NavigationTabComponent,
    PageComponent,
    DropdownColumnComponent,
    DefaultColumnComponent,
    AddRequestModalComponent,
    ViewDetailsModalComponent,
    EditDetailsModalComponent,
    DeleteDetailsModalComponent,
    PaginationComponent,
    DateColumnComponent,
    LoadingViewComponent,
    ErrorViewComponent,
    EmptyPageComponent,
    TabsComponent,
    RequestInfoComponent,
    RequestResourcesComponent,
    AddResourcesComponent,
    AddGeneralInfoComponent,
    EditGeneralInfoComponent,
    EditResourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      features: {
        pause: true,
        lock: true,
        persist: true
      }
    }),
  ],
  providers: [
    BsModalRef,
    DatePipe
  ],
  entryComponents: [
    AddRequestModalComponent,
    ViewDetailsModalComponent,
    EditDetailsModalComponent,
    DeleteDetailsModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }