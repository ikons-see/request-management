import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { CommonModule, LOCATION_INITIALIZED } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DatePipe } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgSelectModule } from '@ng-select/ng-select';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { AppRoutingModule } from './app-routing.module';
import { RequesterComponent } from './pages/requester/requester.component';
import { NavigationTabComponent } from './components/navigation-bar/navigation-tab/navigation-tab.component';
import { PageComponent } from './components/page/page.component';
import { DropdownColumnComponent } from './components/table/dropdown-column/dropdown-column.component';
import { DefaultColumnComponent } from './components/table/default-column/default-column.component';
import { AddRequestModalComponent } from './pages/requester/add-request-modal/add-request-modal.component';
import { ViewDetailsModalComponent } from './pages/requester/view-details-modal/view-details-modal.component';
import { EditDetailsModalComponent } from './pages/requester/edit-details-modal/edit-details-modal.component';
import { DeleteRequestModalComponent } from './pages/requester/delete-request-modal/delete-request-modal.component';

import * as requesterReducer from './store/requester/requester-reducer';
import * as adminReducer from './store/administrator/administrator-reducer';
import * as globalReducer from './store/global/global-reducer';
import { RequesterEffects } from './store/requester/requester-effects';
import { AdministratorEffects } from './store/administrator/administrator-effects';
import { GlobalEffects } from './store/global/global-effects';
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
import { FiltersPanelComponent } from './pages/requester/filters-panel/filters-panel.component';
import { StatusColumnComponent } from './components/table/status-column/status-column.component';
import { CloseRequestModalComponent } from './pages/requester/close-request-modal/close-request-modal.component';
import { AdministratorComponent } from './pages/administrator/administrator.component';
import { ChartsViewComponent } from './pages/administrator/charts-view/charts-view.component';
import { AuthenticatedAppComponent } from './pages/authenticated-app/authenticated-app.component';
import { AdminRequestsComponent } from './pages/administrator/admin-requests/admin-requests.component';
import { AuthInterceptor } from './endpoint/interceptors/token-interceptor.service';
import { AuthExpiredInterceptor } from './endpoint/interceptors/auth-expired.interceptor';
import { ChangeStatusModalComponent } from './pages/administrator/admin-requests/change-status-modal/change-status-modal.component';
import { RequestHistoryModalComponent } from './pages/administrator/admin-requests/request-history-modal/request-history-modal.component';
import { SignInComponent } from './pages/login/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login/sign-up/sign-up.component';
import { LoginPageComponent } from './pages/login/login.component';
import { TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export interface ApplicationState {
  [requesterReducer.featureKey]: requesterReducer.State,
  [adminReducer.featureKey]: adminReducer.State,
  [globalReducer.featureKey]: globalReducer.State
}

const reducers: ActionReducerMap<ApplicationState> = {
  [requesterReducer.featureKey]: requesterReducer.reducer,
  [adminReducer.featureKey]: adminReducer.reducer,
  [globalReducer.featureKey]: globalReducer.reducer
}

const effects = [
  RequesterEffects,
  AdministratorEffects,
  GlobalEffects
];

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
    { prefix: './assets/i18n/', suffix: '.json' }
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ModalComponent,
    TableComponent,
    LoginPageComponent,
    RequesterComponent,
    NavigationTabComponent,
    PageComponent,
    DropdownColumnComponent,
    DefaultColumnComponent,
    AddRequestModalComponent,
    ViewDetailsModalComponent,
    EditDetailsModalComponent,
    DeleteRequestModalComponent,
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
    EditResourcesComponent,
    FiltersPanelComponent,
    StatusColumnComponent,
    CloseRequestModalComponent,
    AdministratorComponent,
    ChartsViewComponent,
    AuthenticatedAppComponent,
    AdminRequestsComponent,
    ChangeStatusModalComponent,
    RequestHistoryModalComponent,
    SignInComponent,
    SignUpComponent
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    AddRequestModalComponent,
    ViewDetailsModalComponent,
    EditDetailsModalComponent,
    DeleteRequestModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
