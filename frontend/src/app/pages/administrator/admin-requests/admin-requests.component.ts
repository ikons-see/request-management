import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { ApplicationState } from '../../../app.module';
import { ActionType, ColumnType, DropdownColumn, RequestStatus, TableConfig } from '../../../types/data-types';
import { RequestDetails, RequestFilters } from '../../../types/request-types';
import {
  getCurrentPage,
  getErrorMessage,
  getFilters,
  getLoadingRequests,
  getRequestsList,
  getTotalNumber
} from "../../../store/requests/requests-reducer";
import {
  addRequestFilters, 
  openChangeStatusModal, 
  openViewDetailsModal,
  pageChanged,
  requestData,
  resetRequestFilters
} from "../../../store/requests/requests-actions";
import { openViewHistoryModal } from '../../../store/administrator/administrator-actions';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit, OnDestroy {

  tableConfiguration: TableConfig;
  dropdownConfig: DropdownColumn;
  requests$: Observable<Array<RequestDetails>>;
  totalNumber$: Observable<number>;
  currentPage$: Observable<number>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  showFilters: boolean = false;
  filters: RequestFilters;
  filtersSubscribtion: Subscription;
  translationSub: Subscription;

  constructor(private store: Store<ApplicationState>,
    private translate: TranslateService) {
    this.loadData(0);

    this.currentPage$ = this.store.select(getCurrentPage);
    this.requests$ = this.store.select(getRequestsList);
    this.totalNumber$ = this.store.select(getTotalNumber);
    this.loading$ = this.store.select(getLoadingRequests);
    this.errorMessage$ = this.store.select(getErrorMessage);

    this.filtersSubscribtion = this.store.select(getFilters).subscribe(value => {
      this.filters = value;
    });
  }

  ngOnInit(): void {
    this.translationSub = this.translate.get('admin').subscribe(translations => {
      this.init(translations);
    });
  }

  init(translations: { [key: string]: string }) {
    this.dropdownConfig = {
      button: {
        text: translations['actions'],
        icon: ''
      },
      values: [
        {
          text: translations['view-details'],
          icon: 'fa-list',
          action: ActionType.view,
          onClick: (e) => this.openDetailsModal(e)
        },
        {
          text: translations['view-history'],
          icon: 'fa-history',
          action: ActionType.history,
          onClick: (e) => this.openViewHistoryModal(e)
        },
        {
          text: translations['take-charge'],
          icon: 'fa-edit',
          action: ActionType.on_going,
          onClick: (e) => this.openChangeStatusModal(e, RequestStatus.ON_GOING)
        },
        {
          text: translations['reject'],
          icon: 'fa-trash',
          action: ActionType.reject,
          onClick: (e) => this.openChangeStatusModal(e, RequestStatus.REJECTED)
        },
        {
          text: translations['pending-information'],
          icon: 'fa-info-circle',
          action: ActionType.pending,
          onClick: (e) => this.openChangeStatusModal(e, RequestStatus.PENDING)
        },
        {
          text: translations['close'],
          icon: 'fa-close',
          action: ActionType.close,
          onClick: (e) => this.openChangeStatusModal(e, RequestStatus.CLOSED)
        }
      ]
    };


    this.tableConfiguration = {
      columns: [
        {
          type: ColumnType.STRING,
          field: 'areaOfInterest',
          text: translations['area-of-interest']
        },
        {
          type: ColumnType.STATUS,
          field: 'status',
          text: translations['status']
        },
        {
          type: ColumnType.DATE,
          field: 'startDate',
          text: translations['start-date']
        },
        {
          type: ColumnType.DATE,
          field: 'endDate',
          text: translations['end-date']
        },
        {
          type: ColumnType.DROPDOWN,
          field: 'requestId',
          text: translations['manage-request'],
          defaultContent: (datum) => this.dropdownConfig
        }
      ]
    };
  }

  loadData(page: number) {
    this.store.dispatch(requestData({ query: { page } }));
  }

  toogleFiltersPanel() {
    this.showFilters = !this.showFilters;
  }

  pageChanged(page: number) {
    this.loadData(page);
    this.store.dispatch(pageChanged({ page: page }));
  }

  openDetailsModal(e) {
    this.store.dispatch(openViewDetailsModal({ requestId: e }))
  }

  openChangeStatusModal(e, status: RequestStatus) {
    this.store.dispatch(openChangeStatusModal({ requestId: e, status }));
  }

  openViewHistoryModal(e) {
    this.store.dispatch(openViewHistoryModal({ requestId: e }));
  }

  applyFilters(e) {
    this.store.dispatch(addRequestFilters({ requestFilters: e }));
  }

  resetFilters() {
    this.store.dispatch(resetRequestFilters());
  }

  ngOnDestroy() {
    this.filtersSubscribtion.unsubscribe();
    this.translationSub.unsubscribe();
  }
}
